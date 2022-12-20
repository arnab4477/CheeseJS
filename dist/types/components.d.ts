/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "./stencil-public-runtime";
export namespace Components {
    interface CheckerBoard {
        "dark"?: string;
        "light"?: string;
    }
    interface ChessBoard {
        "dark"?: string;
        "fen"?: string;
        "light"?: string;
    }
}
declare global {
    interface HTMLCheckerBoardElement extends Components.CheckerBoard, HTMLStencilElement {
    }
    var HTMLCheckerBoardElement: {
        prototype: HTMLCheckerBoardElement;
        new (): HTMLCheckerBoardElement;
    };
    interface HTMLChessBoardElement extends Components.ChessBoard, HTMLStencilElement {
    }
    var HTMLChessBoardElement: {
        prototype: HTMLChessBoardElement;
        new (): HTMLChessBoardElement;
    };
    interface HTMLElementTagNameMap {
        "checker-board": HTMLCheckerBoardElement;
        "chess-board": HTMLChessBoardElement;
    }
}
declare namespace LocalJSX {
    interface CheckerBoard {
        "dark"?: string;
        "light"?: string;
    }
    interface ChessBoard {
        "dark"?: string;
        "fen"?: string;
        "light"?: string;
    }
    interface IntrinsicElements {
        "checker-board": CheckerBoard;
        "chess-board": ChessBoard;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "checker-board": LocalJSX.CheckerBoard & JSXBase.HTMLAttributes<HTMLCheckerBoardElement>;
            "chess-board": LocalJSX.ChessBoard & JSXBase.HTMLAttributes<HTMLChessBoardElement>;
        }
    }
}
