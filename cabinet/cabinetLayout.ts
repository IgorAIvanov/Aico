import { LitElement, html, css } from 'lit';
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import './mcp.ts';
import './functions.ts';
import './bots.ts';
import './welcome.ts';
import './settings.ts';

import '@shoelace-style/shoelace/dist/themes/light.css';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import '@shoelace-style/shoelace/dist/components/drawer/drawer.js';
import '@shoelace-style/shoelace/dist/components/menu/menu.js';
import '@shoelace-style/shoelace/dist/components/menu-item/menu-item.js';
import '@shoelace-style/shoelace/dist/components/divider/divider.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import { state } from 'lit/decorators.js';

interface Menu{
  id : number;
  name: string;
  icon: string; 
  teg: string;
}

export class CabinetLayout extends LitElement {
  static override styles = css`
    .container {
      display: flex;
      height: 100vh;
    }
    .sidebar {
      width: 220px;
      height: 100vh;
      border-right: 1px solid #eee;
    }
    #content {
      flex: 1;
      padding: 2rem;
    }
  `;

  
  private handleMenuEvent(e: Event) {
    console.log('Menu item clicked:', e);
    const target = e.currentTarget as HTMLElement | null;
    const value = target?.getAttribute('value') || '1';
    this.currentView = this.menu.find(item => item.id === parseInt(value))?.teg || '<welcome-view></welcome-view>';
    this.requestUpdate();
  }

  @state()
  menu: Menu[] = [
    { id: 1, name: 'Головна', icon: 'house-door', teg: '<welcome-view></welcome-view>' },
    { id: 0, name: '', icon: '', teg: '' }, // Пустий елемент для розділення
    { id: 2, name: 'Функції', icon: 'hammer', teg: '<functions-view></functions-view>' },
    { id: 3, name: 'MCP серверы', icon: 'layers', teg: '<mcp-page></mcp-page>' },
    { id: 4, name: 'Боты', icon: 'robot', teg: '<bots-view></bots-view>' },
    { id: 5, name: 'Налаштування', icon: 'gear', teg: '<setting-view></setting-view>' }
  ];
  @state()
  currentView: string = '<welcome-view></welcome-view>';

  override render() {
    return html`
      <div class="container">
        <div class="sidebar">
          <sl-menu label="Menu" style="width: 220px; height: 100vh;">
            ${this.menu.map((item) => html`
              ${item.id === 0 ? html`<sl-divider></sl-divider>` : ''}
              <sl-menu-item value="${item.id}" @click=${this.handleMenuEvent.bind(this)}>
                ${item.icon ? html`<sl-icon slot="prefix" name="${item.icon}"></sl-icon>` : ''}
                ${item.name}
              </sl-menu-item>
            `)}
          </sl-menu>
        </div>
        <div id="content">
          ${unsafeHTML(this.currentView)}
        </div>
      </div>
    `;
  }
}

customElements.define('cabinet-layout', CabinetLayout);

// Автоматический рендер в #root, если есть
const root = document.getElementById('root');
if (root) {
  root.innerHTML = '';
  root.appendChild(document.createElement('cabinet-layout'));
}