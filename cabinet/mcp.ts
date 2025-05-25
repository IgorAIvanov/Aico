import { LitElement, html, css } from 'lit';



export class mcp extends LitElement {
    override render()
    {
        return html`
            <div>
                <h1>MCP Servers</h1>
                <p>Manage your MCP servers here.</p>
                <sl-button >Add Server</sl-button>
                <div id="server-list"></div>
            </div>
        `;
    }
}

customElements.define('mcp-page', mcp);
