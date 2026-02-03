// Yflow Pieces - Clean Community Pieces (No Dependencies)
import { httpPiece } from './http/src/clean-index';

export { httpPiece };

// All available pieces
export const allPieces = [
  httpPiece,
];

// Pieces by category
export const piecesByCategory = {
  DEVELOPER_TOOLS: [httpPiece],
};

// Get piece by name
export const getPieceByName = (name: string) => {
  return allPieces.find(piece => piece.displayName.toLowerCase().includes(name.toLowerCase()));
};
