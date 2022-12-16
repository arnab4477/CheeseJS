import type { Components, JSX } from "../types/components";

interface CheckerBoard extends Components.CheckerBoard, HTMLElement {}
export const CheckerBoard: {
  prototype: CheckerBoard;
  new (): CheckerBoard;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
