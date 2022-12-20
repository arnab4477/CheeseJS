import { ComponentDidLoad } from '../../stencil-public-runtime';
export declare class ChessBoard implements ComponentDidLoad {
  light?: string;
  dark?: string;
  fen?: string;
  chessBoardContainer: HTMLElement;
  componentDidLoad(): void;
  render(): any;
}
