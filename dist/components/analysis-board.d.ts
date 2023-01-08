import type { Components, JSX } from "../types/components";

interface AnalysisBoard extends Components.AnalysisBoard, HTMLElement {}
export const AnalysisBoard: {
  prototype: AnalysisBoard;
  new (): AnalysisBoard;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
