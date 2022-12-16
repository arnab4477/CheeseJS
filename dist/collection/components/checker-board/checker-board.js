import { h } from '@stencil/core';
import { generateCheckeredBoard } from '../../checkerboard';
// Define the 'Checkerboard' component
export class Checkerboard {
  constructor() {
    // The html string for the checkered board, generated with the goven colors as props
    this.checkerboardHTML = generateCheckeredBoard(this.lightSquare, this.darkSquare);
    this.lightSquare = 'white';
    this.darkSquare = 'black';
  }
  // This method is called when the component has finished loading
  componentDidLoad() {
    // Set the inner html of the checkerboard container to the html string for the checkered board
    this.checkerboardContainer.innerHTML = this.checkerboardHTML;
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
      "lightSquare": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "light-square",
        "reflect": false,
        "defaultValue": "'white'"
      },
      "darkSquare": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "dark-square",
        "reflect": false,
        "defaultValue": "'black'"
      }
    };
  }
}
