import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { B as BoardArray } from './BoardTypes.js';

/**
 * generateCheckeredBoard is a function that takes two required arguments:
 * @param lightSquareColor string representing the color of the light squares on the chess board
 * @param darkSquareColor string representing the color of the dark squares on the chess board
 *
 * and returns an HTML string representing a checkered board with the given colors.
 */
const generateCheckeredBoard = (lightSquareColor, darkSquareColor) => {
  // The current color that is being used
  let color;
  // The html string that will be returned
  let html = ``;
  // Loop through each row in the board
  for (let i = 0; i < BoardArray.length; i++) {
    // Add the opening tag for the row and set its background color to the current color
    html += `<div class='row'>`;
    // Loop through each square in the row
    for (let j = 0; j < BoardArray.length; j++) {
      // Determine the background color of the square
      color = (i + j) % 2 === 0 ? lightSquareColor : darkSquareColor;
      // Add a div element for the square and set its background color to the current color
      html += `<div class='square' style='background-color: ${color}'></div>`;
    }
    // Add the closing tag for the row
    html += `</div>`;
  }
  // Return the html string
  return html;
};

const checkerBoardCss = "#checker-board-container{position:relative;width:400px;height:400px}.row{display:flex;flex-direction:row;width:100%;height:50px}.square{width:50px;height:50px}@media (max-width: 550px){#checker-board-container{width:360px;height:360px}.row{height:45px}.square{width:45px;height:45px}}";

const Checkerboard = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.light = '#E0C35A';
    this.dark = '#7A6A31';
  }
  // This method is called when the component has finished loading
  componentDidLoad() {
    // Set the inner html of the checkerboard container to the html string for the checkered board
    this.checkerboardContainer.innerHTML = generateCheckeredBoard(this.light, this.dark);
  }
  render() {
    return (h("div", { ref: (el) => (this.checkerboardContainer = el), id: "checker-board-container" }));
  }
  static get style() { return checkerBoardCss; }
}, [1, "checker-board", {
    "light": [1025],
    "dark": [1025]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["checker-board"];
  components.forEach(tagName => { switch (tagName) {
    case "checker-board":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, Checkerboard);
      }
      break;
  } });
}

const CheckerBoard = Checkerboard;
const defineCustomElement = defineCustomElement$1;

export { CheckerBoard, defineCustomElement };
