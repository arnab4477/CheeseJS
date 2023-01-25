const parsePGN = (pgn) => {
  // Split the PGN string into an array of tokens
  const tokens = pgn.split(/\s+/);
  // Initialize an array to store the moves
  const moves = [];
  // Loop over the tokens and extract the moves
  tokens.forEach((token) => {
    // If the input is empty then return an empty array
    if (pgn === '')
      return [];
    // Check if the token is a move
    if (token.match(/^\d+\.$/)) {
      // Skip over tokens that represent move numbers
      return;
    }
    // Add the move to the array of moves
    moves.push(token);
  });
  // Return the array of moves
  return moves;
};
export default parsePGN;
