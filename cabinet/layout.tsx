import { render } from "hono/jsx/dom";
 import '@shoelace-style/shoelace/dist/themes/light.css';
 import '@shoelace-style/shoelace/dist/components/button/button.js';
  import '@shoelace-style/shoelace/dist/components/input/input.js';


export default function Layout() {
  return (
    <div>
      <h1>Cabinet</h1>
      <sl-input type="text" placeholder="Type here..." ></sl-input>
      <sl-button variant="primary">Primary</sl-button>
      <sl-button variant="success" >Success</sl-button>
      <sl-button variant="warning">Warning</sl-button>
      <sl-button variant="danger" >Danger</sl-button>
      <sl-button variant="info">Info</sl-button>
      <sl-button variant="neutral">Neutral</sl-button>
    </div>
  
  )
}

const root = document.getElementById("root");
render(<Layout />, root);