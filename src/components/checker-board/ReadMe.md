# checker-board

The checkerboard component is a stencil component that displays a checkered board in the browser. It is made up of a series of div elements with alternating colors, creating a grid pattern.

## Importing the component

To use the checkerboard component in your project, you will need to import it from the 'cheese-js' library:

`import { checker-board } from 'cheese-js';`

To use the checkerboard component in your project, you can simply add the `<checker-board>` element to your template:
This will render the checkered board in the browser.

## Component properties

The checkerboard component comes with two optional properties, `light` - for the color of
the lightsquares and `dark` - for the color of the dark squares. For example,
`<checker-board light="lightgray" dark="darkgray"></checker-board>` will render a checkerboard with lighgray as its light square and darkhray as dark squares. As long as the color is valid in CSS, you can use any color
