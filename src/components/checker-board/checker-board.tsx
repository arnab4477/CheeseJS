import { Component, Prop, h, ComponentDidLoad } from '@stencil/core';
import { generateCheckeredBoard } from '../../utils/checkerboard';

// Define the 'Checkerboard' component
@Component({
  tag: 'checker-board',
  styleUrl: 'checker-board.css',
  shadow: true,
})
export class Checkerboard implements ComponentDidLoad {
  // Component properties for the square colors
  @Prop({ mutable: true }) lightSquare: string = 'white';
  @Prop({ mutable: true }) darkSquare: string = 'black';

  // A reference to the checkerboard container element
  checkerboardContainer: HTMLElement;

  // The html string for the checkered board, generated with the goven colors as props
  checkerboardHTML = generateCheckeredBoard(this.lightSquare, this.darkSquare);

  // This method is called when the component has finished loading
  componentDidLoad() {
    // Set the inner html of the checkerboard container to the html string for the checkered board
    this.checkerboardContainer.innerHTML = this.checkerboardHTML;
  }

  render() {
    return (
      <div
        ref={(el) => (this.checkerboardContainer = el as HTMLElement)}
        id="checker-board-container"
      ></div>
    );
  }
}
