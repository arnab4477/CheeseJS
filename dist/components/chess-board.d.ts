import type { Components, JSX } from "../types/components";

interface ChessBoard extends Components.ChessBoard, HTMLElement {}
export const ChessBoard: {
  prototype: ChessBoard;
  new (): ChessBoard;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
