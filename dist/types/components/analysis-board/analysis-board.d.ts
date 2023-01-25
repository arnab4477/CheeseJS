import { ComponentDidLoad } from '../../stencil-public-runtime';
import Validator from '../../MoveValidators/Validator';
export declare class AnalysisBoard implements ComponentDidLoad {
  light?: string;
  dark?: string;
  analysisBoardContainer: HTMLElement;
  validator: Validator;
  componentDidLoad(): void;
  render(): any;
}
