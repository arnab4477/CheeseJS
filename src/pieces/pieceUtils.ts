import { PieceType } from './pieceTypes';
import { BoardMap, BoardArray, BoardType } from '../BoardTypes';
import { pieceImages as i } from './pieceImages';


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
      }" class="square" style="background-color: ${color}"><img id="P" alt='white pawn' class="piece" draggable="true" src=${i.P}></div>`;
    case PieceType.blackPawn:
      return `<div id="${
        BoardArray[rank][file]
      }" class="square" style="background-color: ${color}"><img id="p" alt='black pawn' class="piece" draggable="true" src=${i.p}></div>`;
    case PieceType.whiteRook:
      return `<div id="${
        BoardArray[rank][file]
      }" class="square" style="background-color: ${color}"><img id="R" alt='white rook' class="piece" draggable="true" src=${i.R}></div>`;
    case PieceType.blackRook:
      return `<div id="${
        BoardArray[rank][file]
      }" class="square" style="background-color: ${color}"><img id="r" alt='black rook' class="piece" draggable="true" src=${i.r}></div>`;
    case PieceType.whiteKnight:
      return `<div id="${
        BoardArray[rank][file]
      }" class="square" style="background-color: ${color}"><img id="N" alt='white knight' class="piece" draggable="true" src=${i.N}></div>`;
    case PieceType.blackKnight:
      return `<div id="${
        BoardArray[rank][file]
      }" class="square" style="background-color: ${color}"><img id="n" alt='black knight' class="piece" draggable="true" src=${i.n}></div>`;
    case PieceType.whiteBishop:
      return `<div id="${
        BoardArray[rank][file]
      }" class="square" style="background-color: ${color}"><img id="B" alt='white bishop' class="piece" draggable="true" src=${i.B}></div>`;
    case PieceType.blackBishop:
      return `<div id="${
        BoardArray[rank][file]
      }" class="square" style="background-color: ${color}"><img id="b" alt='black bishop' class="piece" draggable="true" src=${i.b}></div>`;
    case PieceType.whiteQueen:
      return `<div id="${
        BoardArray[rank][file]
      }" class="square" style="background-color: ${color}"><img id="Q" alt='white queen' class="piece" draggable="true" src=${i.Q}></div>`;
    case PieceType.blackQueen:
      return `<div id="${
        BoardArray[rank][file]
      }" class="square" style="background-color: ${color}"><img id="q" alt='black queen' class="piece" draggable="true" src=${i.q}></div>`;
    case PieceType.whiteKing:
      return `<div id="${
        BoardArray[rank][file]
      }" class="square" style="background-color: ${color}"><img id="K" alt='white king' class="piece" draggable="true" src=${i.K}></div>`;
    case PieceType.blackKing:
      return `<div id="${
        BoardArray[rank][file]
      }" class="square" style="background-color: ${color}"><img id="k" alt='black king' class="piece" draggable="true" src=${i.k}></div>`;
    default:
      return '';
  }
};

/**
 * fenToBoardMap takes one optional input
 * @param fen : an FEN string of a vlid Chess position. If no FEN
 * os provided then uses the FEN for the starting position and
 * @returns an object representation of a Chess board and places pieces
 * according to the FEN
 */
export const fenToBoardMap = (
  fen: string = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR'
): BoardType => {
  const rows: string[] = fen.split('/');

  // create a copy of the BoardMap
  const board: BoardType = { ...BoardMap };
  let piece: string = '';

  // Iterate over the ranks and files of the Chess board array
  for (let rank = 0; rank < BoardArray.length; rank++) {
    for (let file = 0; file < BoardArray.length; file++) {
      piece = rows[rank][file];

      // Each square is a 2 character string, like 'a1'
      // The following code will extract the file and rank out of each square
      let currentSquare: string = BoardArray[rank][file];
      let currentFile: string = currentSquare[0];
      let currentRank: string = currentSquare[1];

      // if the piece is a character, it is a piece
      if (typeof piece === 'string' && piece.match(/[a-zA-Z]/)) {
        board[currentFile][currentRank] = piece;
      } else if (typeof parseInt(piece) === 'number') {
        // If the piece is a number then it is the number of empty squares
        // Sp ;oop through the array and increment the file to leave out the empty squares

        for (let empties = 0; empties < parseInt(piece); empties++) {
          file++;
        }
      }
    }
  }

  return board;
};
