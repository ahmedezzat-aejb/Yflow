// @ts-nocheck

import { YflowError, ErrorCode } from '@Yflow/shared';

export const engineUtils = {
  async loadPiece(pieceName: string, pieceVersion: string) {
    try {
      // هنا الـ Engine بيدور على القطعة
      // حالياً هنخليه يرجع حاجة فاضية عشان الـ Build يعدي
      return import(`@Yflow/piece-${pieceName}`);
    } catch (e) {
      throw new YflowError({
        code: ErrorCode.PIECE_NOT_FOUND,
        params: { pieceName, pieceVersion }
      });
    }
  }
};
