// @ts-nocheck

import { ExecutionState } from '@Yflow/pieces-framework';
import { isNil } from '@Yflow/shared';

export class VariableService {
  resolve(compiledValue: any, executionState: ExecutionState): any {
    if (isNil(compiledValue) || typeof compiledValue !== 'string') {
      return compiledValue;
    }
    // دي النسخة المبسطة عشان نلحق نخلص انهارده
    // بتبحث عن الأنماط وتستبدلها من الـ executionState
    return compiledValue.replace(/\{\{(.*?)\}\}/g, (match, path) => {
      const parts = path.split('.');
      let current = executionState.steps;
      for (const part of parts) {
        if (current[part] === undefined) return match;
        current = current[part];
      }
      return current;
    });
  }
}
