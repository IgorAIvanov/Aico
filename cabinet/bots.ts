import { LitElement, html, css } from 'lit';

export class BotsView extends LitElement {
  static override styles = css`
    h1 {
      text-align: center;
    }
  `;

  override render() {
    return html`
      <div>
        <h1>Bots page</h1>
      </div>
    `;
  }
}

customElements.define('bots-view', BotsView);