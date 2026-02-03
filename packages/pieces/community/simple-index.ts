// Yflow Pieces - Simple Community Pieces (No Environment Variables)
import { httpPiece } from './http/src/simple-index';
import { slackPiece } from './slack/src/simple-index';
import { googleSheetsPiece } from './google-sheets/src/simple-index';
import { notionPiece } from './notion/src/simple-index';

export { httpPiece, slackPiece, googleSheetsPiece, notionPiece };

// All available pieces
export const allPieces = [
  httpPiece,
  slackPiece,
  googleSheetsPiece,
  notionPiece,
];

// Pieces by category
export const piecesByCategory = {
  DEVELOPER_TOOLS: [httpPiece],
  COMMUNICATION: [slackPiece],
  PRODUCTIVITY: [googleSheetsPiece, notionPiece],
};

// Get piece by name
export const getPieceByName = (name: string) => {
  return allPieces.find(piece => piece.displayName.toLowerCase().includes(name.toLowerCase()));
};
