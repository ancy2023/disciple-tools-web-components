import { html, css, LitElement } from 'lit';

export class DtModal extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        font-family: var(--font-family);
      }
      :host:has(dialog[open]) {
        overflow: hidden;
      }

      .dt-modal {
        display: grid;
        background: var(--dt-modal-background-color, #fff);
        color: var(--dt-modal-color, #000);
        max-inline-size: min(90vw, 100%);
        max-block-size: min(80vh, 100%);
        max-block-size: min(80dvb, 100%);
        margin: auto;
        padding: 1em;
        position: fixed;
        inset: 0;
        border-radius: 5%;
        border: none;
        box-shadow: var(--shadow-6);
        z-index: 1000;
        overflow: hidden;
        transition: opacity .1s ease-in-out
      }

      dialog:not([open]) {
        pointer-events: none;
        opacity: 0;
      }

      h1, h2, h3, h4, h5, h6 {
        line-height: 1.4;
        text-rendering: optimizeLegibility;
        color: inherit;
        font-style: normal;
        font-weight: 300;
        margin: 0;
      }

      header {
        display: flex;
        justify-content: space-between;
      }

      .button {
        color: var(--dt-modal-button-color, #fff);
        background: var(--dt-modal-button-background, #000);
        font-size: 1rem;
        border: 0.1em solid rgba(0, 0, 0, 0.2);
        border-radius: 0.25em;
        padding: 0.25em 0.5em;
        cursor: pointer;
      }
      button.toggle {
        margin-inline-end: 0;
        margin-inline-start: auto;
        background: none;
        border: none;
        color: inherit;
        cursor: pointer;
        display: flex;
        align-items: flex-start;
      }
    `;
  }

  static get properties() {
    return {
      title: { type: String },
      context: { type: String },
      isHelp: { type: Boolean },
      isOpen: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.context = 'default';
  }

  _openModal() {
    this.shadowRoot.querySelector('dialog').showModal();
  }

  _dismiss() {
    this.open = false;
  }

  render() {
    return html`
      <dialog id="" class="dt-modal">
          <form method="dialog">
              <header>
                  <h1 id="modal-field-title">
                      ${this.title}
                  </h1>
                  <button @click="${this._dismiss}" class='toggle'>
                    <svg viewPort="0 0 12 12" version="1.1" width='12' height='12'>
                        xmlns="http://www.w3.org/2000/svg">
                      <line x1="1" y1="11"
                            x2="11" y2="1"
                            stroke="currentColor"
                            stroke-width="2"/>
                      <line x1="1" y1="1"
                            x2="11" y2="11"
                            stroke="currentColor"
                            stroke-width="2"/>
                    </svg>
                  </button>
              </header>
              <article>
                <slot name="content"></slot>
              </article>
              <footer>
                  <button class="button small" data-close="" aria-label="Close reveal" type="button" onclick="this.closest('dialog').close('close')">
                    <slot name="close-button">Close</slot>
                  </button>
                  ${
                    this.isHelp? html`
                      <div class="help-more">
                          <h5>Need more help?</h5>
                          <a class="button small" id="docslink" href="https://disciple.tools/user-docs" target="_blank">Read the documentation</a>
                      </div>
                    `: null
                  }
              </footer>
          </form>
      </dialog>

      <button class="button small" data-open="" aria-label="Open reveal" type="button" @click="${this._openModal}"><slot name="openButton">Open Dialogue</slot></button>
      `;
  }
}

window.customElements.define('dt-modal', DtModal);
