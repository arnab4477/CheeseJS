import { PieceType } from './pieceTypes';

/**
 * getPieceImage takes a piece type and color and returns the corresponding symbol for the piece,
 * and function then creates an HTML string to add the pieces to the squares
 */
export const getPieceImage = (
  type: string,
  color: string,
  BoardArray: string[][],
  rank: number,
  file: number
): string => {
  switch (type) {
    case PieceType.whitePawn:
      return `<div id="${
        BoardArray[rank][file]
      }" class="square" style="background-color: ${color}"><img id="wp" alt='white pawn' class="piece" draggable="true" src=${'../assets/WP.svg.png'} alt="abc"></div>`;
    case PieceType.blackPawn:
      return `<div id="${
        BoardArray[rank][file]
      }" class="square" style="background-color: ${color}"><img id="bp" alt='black pawn' class="piece" draggable="true" src=${'../assets/bp.svg.png'} alt="abc"></div>`;
    case PieceType.whiteRook:
      return `<div id="${
        BoardArray[rank][file]
      }" class="square" style="background-color: ${color}"><img id="wr" alt='white rook' class="piece" draggable="true" src=${'../assets/WR.svg.png'} alt="abc"></div>`;
    case PieceType.blackRook:
      return `<div id="${
        BoardArray[rank][file]
      }" class="square" style="background-color: ${color}"><img id="br" alt='black rook' class="piece" draggable="true" src=${'../assets/br.svg.png'} alt="abc"></div>`;
    case PieceType.whiteKnight:
      return `<div id="${
        BoardArray[rank][file]
      }" class="square" style="background-color: ${color}"><img id="wn" alt='white knight' class="piece" draggable="true" src=${'../assets/WN.svg.png'} alt="abc"></div>`;
    case PieceType.blackKnight:
      return `<div id="${
        BoardArray[rank][file]
      }" class="square" style="background-color: ${color}"><img id="bn" alt='black knight' class="piece" draggable="true" src=${'../assets/bn.svg.png'} alt="abc"></div>`;
    case PieceType.whiteBishop:
      return `<div id="${
        BoardArray[rank][file]
      }" class="square" style="background-color: ${color}"><img id="wb" alt='white bishop' class="piece" draggable="true" src=${'../assets/WB.svg.png'} alt="abc"></div>`;
    case PieceType.blackBishop:
      return `<div id="${
        BoardArray[rank][file]
      }" class="square" style="background-color: ${color}"><img id="bb" alt='black bishop' class="piece" draggable="true" src=${'../assets/bb.svg.png'} alt="abc"></div>`;
    case PieceType.whiteQueen:
      return `<div id="${
        BoardArray[rank][file]
      }" class="square" style="background-color: ${color}"><img id="wq" alt='white queen' class="piece" draggable="true" src=${'../assets/WQ.svg.png'} alt="abc"></div>`;
    case PieceType.blackQueen:
      return `<div id="${
        BoardArray[rank][file]
      }" class="square" style="background-color: ${color}"><img id="bq" alt='black queen' class="piece" draggable="true" src=${'../assets/bq.svg.png'} alt="abc"></div>`;
    case PieceType.whiteKing:
      return `<div id="${
        BoardArray[rank][file]
      }" class="square" style="background-color: ${color}"><img id="wk" alt='white king' class="piece" draggable="true" src=${'../assets/WK.svg.png'} alt="abc"></div>`;
    case PieceType.blackKing:
      return `<div id="${
        BoardArray[rank][file]
      }" class="square" style="background-color: ${color}"><img id="bk" alt='black king' class="piece" draggable="true" src=${'../assets/bk.svg.png'} alt="abc"></div>`;
    default:
      return '';
  }
};
