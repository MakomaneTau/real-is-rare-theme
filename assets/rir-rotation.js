/** Collection-backed filters, scoped to each section and Theme Editor reload. */
class RirRotation extends HTMLElement {
  connectedCallback() {
    if (this.initialized) return;
    this.initialized = true;
    this.filters = [...this.querySelectorAll('[data-filter]')];
    this.panels = [...this.querySelectorAll('[data-panel]')];
    this.onClick = (event) => {
      const button = event.target.closest('[data-filter]');
      if (button && this.contains(button)) this.select(button);
    };
    this.onKeyDown = (event) => {
      const button = event.target.closest('[data-filter]');
      if (!button || !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const index = this.filters.indexOf(button);
      const direction = getComputedStyle(this).direction === 'rtl' ? -1 : 1;
      const offset = event.key === 'ArrowRight' ? direction : -direction;
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? this.filters.length - 1 : (index + offset + this.filters.length) % this.filters.length;
      this.filters[next].focus();
      this.select(this.filters[next]);
    };
    this.addEventListener('click', this.onClick);
    this.addEventListener('keydown', this.onKeyDown);
    this.querySelector('[data-filters]').hidden = false;
  }
  select(button) {
    this.filters.forEach(filter => filter.setAttribute('aria-pressed', String(filter === button)));
    this.panels.forEach(panel => { panel.hidden = panel.dataset.panel !== button.dataset.filter; });
    const panel = this.panels.find(panel => !panel.hidden);
    const count = panel?.querySelectorAll('li').length ?? 0;
    this.querySelector('[data-filter-status]').textContent = button.textContent.trim() + ': ' + count + (count === 1 ? ' piece.' : ' pieces.');
  }
  disconnectedCallback() {
    this.removeEventListener('click', this.onClick);
    this.removeEventListener('keydown', this.onKeyDown);
    this.initialized = false;
  }
}
if (!customElements.get('rir-rotation')) customElements.define('rir-rotation', RirRotation);
