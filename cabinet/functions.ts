import { LitElement, html, css } from 'lit';
import { state } from 'lit/decorators.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import '@shoelace-style/shoelace/dist/components/icon-button/icon-button.js';
import '@shoelace-style/shoelace/dist/components/tooltip/tooltip.js';
import '@shoelace-style/shoelace/dist/components/alert/alert.js';

interface Func {
  id: number;
  name: string;
  description: string;
  token?: string;
}

export class FunctionsView extends LitElement {
  static override styles = css`
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 1rem;
    }
    th, td {
      border: 1px solid #ccc;
      padding: 8px;
      text-align: left;
    }
    th {
      background: #f5f5f5;
    }
    .sl-toast-stack {
      left: auto
      right: 0;
      top: 0;
      bottom: auto;
}
  `;

 copyToClipboard(token: string) {
  console.log('Copying token to clipboard:', token);
    navigator.clipboard.writeText(token).then(() => {
      const toast = Object.assign(document.createElement('sl-alert'), {
        variant: 'success',
        duration: 1500,
        closable: true,
        innerHTML: `<sl-icon slot="icon" name="check2-circle"></sl-icon>Токен скопійовано в буфер обміну!`
      });
      document.body.appendChild(toast);
      // Показываем toast через show() для sl-alert
      // @ts-ignore: sl-alert has show() method at runtime, but it's not in the HTMLElement type
      toast.toast();
    });
  }

  override connectedCallback() {
    super.connectedCallback();
    this.fetchFunctions();
  }

  async fetchFunctions() {
    try {
      const response = await fetch('/api/services/functions');
      const data = await response.json();
      this.functions = data;
      data.forEach((func: Func) => {
        func.token = 'ERTND-FSDFS-FGLKDSF034-434343' ;//Generete random token for each function
      });;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching functions:', error);
    }
  }

 @state()
  functions: Func[] = [];

  override render() {
    return html`
      <div>
        <h1 style="text-align:center">This is functions content</h1>
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>description</th>
              <th>token</th>
              <th>  </th>
            </tr>
          </thead>
          <tbody>
            ${this.functions.map(
              (func) => html`
                <tr>
                  <td>${func.id}</td>
                  <td>${func.name}</td>
                  <td>${func.description}</td>
                  <td>${func.token ?? ''}</td>
                  <td>
                    <sl-tooltip content="Копіювати токен до буферу обміну">
                      <sl-icon-button name="files" @click=${() => this.copyToClipboard(func.token ?? '')}></sl-icon-button>
                    </sl-tooltip>
                  </td>
                </tr>
              `
            )}
          </tbody>
        </table>
      </div>
    `;
  }
}

customElements.define('functions-view', FunctionsView);