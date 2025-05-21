import { render } from "hono/jsx/dom";
import Welcome from "./welcome.tsx";
import Functions from "./functions.tsx";
import Mcp from "./mcp.tsx";
import Bots from "./bots.tsx";
import Settings from "./settings.tsx";
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
      <div>
     <sl-menu label="Menu"  style={{ width: "220px", height: "100vh" }}>
      <sl-menu-item value="Welcome" onClick={handleMenuEvent} >
          <sl-icon slot="prefix" name="house-door"></sl-icon>
          
          </sl-menu-item>
         <sl-divider></sl-divider>
        <sl-menu-item value="Functions" onClick={handleMenuEvent} >
          <sl-icon slot="prefix" name="hammer"></sl-icon>
          Функції
          </sl-menu-item>
        <sl-menu-item value="Mcp" onClick={handleMenuEvent}>
          <sl-icon slot="prefix" name="files" ></sl-icon>
          MCP серверы
        </sl-menu-item>
        <sl-menu-item value="Bots" onClick={handleMenuEvent}>
          <sl-icon slot="prefix" name="robot" ></sl-icon>
          Боты
        </sl-menu-item>
        <sl-divider></sl-divider>
        <sl-menu-item value="Settings" onClick={handleMenuEvent}>
          <sl-icon slot="prefix" name="gear" ></sl-icon>
          Налаштування
        </sl-menu-item>
        </sl-menu>
      </div>
      <div id="content" style={{ flex: 1, padding: "2rem" }}>
        <Welcome />
        </div>   
    
   </div>
  );
}

 function handleMenuEvent () {
  const content = document.getElementById("content");
  const value = this.value;
    if (value === "Functions") {
      render(<Functions />, content);
    } else if (value === "Mcp") {
      render(<Mcp />, content);
    }
    else if (value === "Bots") {
      render(<Bots />, content);
    } else if (value === "Settings") {
      render(<Settings />, content);
    } else if (value === "Welcome") {
      render(<Welcome />, content);
    }
 }

const root = document.getElementById("root");
render(<Layout />, root);