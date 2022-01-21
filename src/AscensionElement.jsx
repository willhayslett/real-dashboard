import React from 'react';
import ReactDOM from 'react-dom';

export default AscensionPanelElement => class extends HTMLElement {
  constructor() {
    super();
    this._renderScheduled = null;

    // Initialize properties as `null` and create setters that triggers a render
    const props = {};
    ['hass', 'showMenu', 'narrow', 'panel'].forEach((prop) => {
      const key = `_${prop}`;
      this[key] = null;
      props[prop] = {
        set(value) {
          const changed = value !== this[key];
          this[key] = value;
          changed && this._render();
        }
      }
    });
    Object.defineProperties(this, props);
  }

  disconnectedCallback() {
    ReactDOM.unmountComponentAtNode(this);
  }

  _render() {
    if (this._renderScheduled !== null) return;

    this._renderScheduled = Promise.resolve().then(() => {
      this._renderScheduled = null;
      ReactDOM.render(React.createElement(AscensionPanelElement, {
        hass: this._hass,
        showMenu: this._showMenu,
        narrow: this._narrow,
        panel: this._panel,
      }), this);
    });
  }
}