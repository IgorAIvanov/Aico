import { LitElement, html, css } from 'lit';

export class SettingView extends LitElement {
  static override styles = css`
    h1 {
      text-align: center;
    }
  `;

  override render() {
    return html`
      <div>
          <h1 align="center">Settings page</h1>
      </div>
    `;
  }
}

customElements.define('setting-view', SettingView);