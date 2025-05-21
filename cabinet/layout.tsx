import { render } from "hono/jsx/dom";
import '@shoelace-style/shoelace/dist/themes/light.css';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import '@shoelace-style/shoelace/dist/components/drawer/drawer.js';
import '@shoelace-style/shoelace/dist/components/menu/menu.js';
import '@shoelace-style/shoelace/dist/components/menu-item/menu-item.js';
import '@shoelace-style/shoelace/dist/components/divider/divider.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';


export default function Layout() {
  return (
    <div style={{ display: "flex"}}>
     <sl-menu label="Menu" style={{ width: "250px", height: "100vh", padding: "1rem" }}>
      <sl-menu-item value="1">
          <sl-icon slot="prefix" name="house-door"></sl-icon>
          
          </sl-menu-item>
         <sl-divider></sl-divider>
        <sl-menu-item value="1">
          <sl-icon slot="prefix" name="hammer"></sl-icon>
          Функції
          </sl-menu-item>
        <sl-menu-item value="2">
          <sl-icon slot="prefix" name="files" ></sl-icon>
          MCP серверы
        </sl-menu-item>
        <sl-menu-item value="3" >
          <sl-icon slot="prefix" name="robot" ></sl-icon>
          Боты
        </sl-menu-item>
        <sl-divider></sl-divider>
        <sl-menu-item value="5">
          <sl-icon slot="prefix" name="gear" ></sl-icon>
          Налаштування
        </sl-menu-item>
        </sl-menu>
      <div style={{ flex: 1, padding: "2rem" }}>
        <h1>Cabinet</h1>
        <sl-input type="text" placeholder="Type here..." ></sl-input>
        <div style={{ marginTop: "1rem" }}>
          
          <sl-button variant="success" size="small" style={{ marginLeft: 8 }}>Success</sl-button>
          <sl-button variant="warning" style={{ marginLeft: 8 }}>Warning</sl-button>
          <sl-button variant="danger" style={{ marginLeft: 8 }}>Danger</sl-button>
          <sl-button variant="info" style={{ marginLeft: 8 }}>Info</sl-button>
          <sl-button variant="neutral" style={{ marginLeft: 8 }}>Neutral</sl-button>
        </div>
      </div>
      <div id="content"></div>
    </div>
  );
}

const root = document.getElementById("root");
render(<Layout />, root);