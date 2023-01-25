import { h } from '@stencil/core';
import { generateCheckeredBoard } from '../../utils/checkerboard';
export class Checkerboard {
  constructor() {
    this.light = 'white';
    this.dark = 'black';
  }
  // This method is called when the component has finished loading
  componentDidLoad() {
    // Set the inner html of the checkerboard container to the html string for the checkered board
    this.checkerboardContainer.innerHTML = generateCheckeredBoard(this.light, this.dark);
  }
  render() {
    return (h("div", { ref: (el) => (this.checkerboardContainer = el), id: "checker-board-container" }));
  }
  static get is() { return "checker-board"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["checker-board.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["checker-board.css"]
    };
  }
  static get properties() {
    return {
      "light": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "light",
        "reflect": false,
        "defaultValue": "'white'"
      },
      "dark": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "dark",
        "reflect": false,
        "defaultValue": "'black'"
      }
    };
  }
}
