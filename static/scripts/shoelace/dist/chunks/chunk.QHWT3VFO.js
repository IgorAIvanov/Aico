import {
  SlRadioButton
} from "./chunk.G7RQ5NDY.js";

// src/react/radio-button/index.ts
import * as React from "react";
import { createComponent } from "@lit/react";
import "@lit/react";
var tagName = "sl-radio-button";
SlRadioButton.define("sl-radio-button");
var reactWrapper = createComponent({
  tagName,
  elementClass: SlRadioButton,
  react: React,
  events: {
    onSlBlur: "sl-blur",
    onSlFocus: "sl-focus"
  },
  displayName: "SlRadioButton"
});
var radio_button_default = reactWrapper;

export {
  radio_button_default
};
