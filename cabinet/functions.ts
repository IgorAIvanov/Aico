import { LitElement, html, css } from 'lit';
import { state } from 'lit/decorators.js';

interface Func {
  id: number;
  name: string;
  description: string;
  created_at?: string;
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
  `;

  @state()
  functions: Func[] = [];

  override connectedCallback() {
    super.connectedCallback();
    this.fetchFunctions();
  }

  async fetchFunctions() {
    try {
      const response = await fetch('/api/services/functions');
      const data = await response.json();
      this.functions = data;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching functions:', error);
    }
  }

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
              <th>created_at</th>
            </tr>
          </thead>
          <tbody>
            ${this.functions.map(
              (func) => html`
                <tr>
                  <td>${func.id}</td>
                  <td>${func.name}</td>
                  <td>${func.description}</td>
                  <td>${func.created_at ?? ''}</td>
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