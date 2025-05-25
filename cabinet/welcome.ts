import { LitElement, html, css } from 'lit';

export class WelcomeView extends LitElement {
  static override styles = css`
    h1 {
      text-align: center;
    }
  `;

  override render() {
    return html`
      <div>
          <h1>Welcome robot people!</h1>
      </div>
    `;
  }
}

customElements.define('welcome-view', WelcomeView);