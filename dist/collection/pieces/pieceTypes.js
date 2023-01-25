/**
 * This enum matches with the piece representations of an FEN string.
 * Capital letter for white pieces and small letter for black pieces
 */
export var PieceType;
(function (PieceType) {
  PieceType["whitePawn"] = "P";
  PieceType["blackPawn"] = "p";
  PieceType["whiteRook"] = "R";
  PieceType["blackRook"] = "r";
  PieceType["whiteKnight"] = "N";
  PieceType["blackKnight"] = "n";
  PieceType["whiteBishop"] = "B";
  PieceType["blackBishop"] = "b";
  PieceType["whiteQueen"] = "Q";
  PieceType["blackQueen"] = "q";
  PieceType["whiteKing"] = "K";
  PieceType["blackKing"] = "k";
})(PieceType || (PieceType = {}));
