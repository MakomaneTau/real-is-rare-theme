import { getIntersectionRoot, scrollContainerMediaQuery } from '@theme/scroll-container';

// Content stays visible by default, including when JavaScript is unavailable.
const main = document.getElementById('MainContent');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const cardSelector = '.product-grid__item, .resource-list__item';
const contentSelector = [
  cardSelector,
  '.section-resource-list__header',
  '.section-resource-list__content',
  '.product-information__media',
  '.product-details',
].join(', ');

if (main && 'IntersectionObserver' in window && 'animate' in Element.prototype && !window.Shopify?.designMode) {
  const seen = new WeakSet();
  const pending = new Set();
  const animations = new Map();
  let observer;
  let scanFrame;

  function reveal(element, delay = 0) {
    observer.unobserve(element);
    pending.delete(element);
    seen.add(element);
    if (reducedMotion.matches || element.contains(document.activeElement)) return;

    // Only move cards: transforming section wrappers can change sticky positioning.
    const rise = element.matches(cardSelector);
    const animation = element.animate(
      [
        { opacity: 0, ...(rise ? { translate: '0 20px' } : {}) },
        { opacity: 1, ...(rise ? { translate: '0 0' } : {}) },
      ],
      { duration: 600, delay, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'backwards' }
    );
    animations.set(element, animation);
    animation.onfinish = animation.oncancel = () => animations.delete(element);
  }

  function scan() {
    scanFrame = undefined;
    for (const element of pending) {
      if (!main.contains(element)) {
        observer.unobserve(element);
        pending.delete(element);
      }
    }
    for (const [element, animation] of animations) {
      if (!main.contains(element)) animation.cancel();
    }
    if (reducedMotion.matches) return;

    for (const section of main.querySelectorAll(':scope > .shopify-section')) {
      const candidates = [...section.querySelectorAll(contentSelector)];
      // Generic homepage sections get a fade; grids reveal each card independently.
      const targets = candidates.length ? candidates : [section];
      for (const element of targets) {
        if (seen.has(element) || pending.has(element)) continue;
        // Avoid applying two animations to nested targets.
        if (candidates.some((candidate) => candidate !== element && candidate.contains(element))) continue;
        pending.add(element);
        observer.observe(element);
      }
    }
  }

  function connect() {
    observer?.disconnect();
    pending.clear();
    observer = new IntersectionObserver(
      (entries) => {
        let stagger = 0;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          reveal(entry.target, entry.target.matches(cardSelector) ? (stagger++ % 4) * 65 : 0);
        }
      },
      { root: getIntersectionRoot(), threshold: 0.01 }
    );
    scan();
  }

  // Filters, pagination, recommendations and theme section rendering replace DOM nodes.
  new MutationObserver(() => {
    if (scanFrame === undefined) scanFrame = requestAnimationFrame(scan);
  }).observe(main, { childList: true, subtree: true });

  main.addEventListener('focusin', (event) => {
    for (const element of pending) {
      if (element.contains(event.target)) reveal(element);
    }
    for (const [element, animation] of animations) {
      if (element.contains(event.target)) animation.cancel();
    }
  });

  reducedMotion.addEventListener('change', () => {
    for (const animation of animations.values()) animation.cancel();
    connect();
  });
  scrollContainerMediaQuery.addEventListener('change', connect);
  connect();
}
