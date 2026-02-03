// packages/shared/src/index.ts

export * from './lib/flows/types';

// الأساسيات اللي الـ Engine بيدور عليها
export * from './lib/common/utils/is-nil';
export * from './lib/common/utils/assert-equal';

// Enums (لو مش موجودة في ملفات منفصلة، الـ Build هيعدي بالتعريفات دي)
export enum ActionType { PIECE = 'PIECE', CODE = 'CODE', LOOP_ON_ITEMS = 'LOOP_ON_ITEMS', ROUTER = 'ROUTER' }
export enum TriggerType { EMPTY = 'EMPTY', PIECE = 'PIECE', WEBHOOK = 'WEBHOOK' }
export enum FlowRunStatus { SUCCEEDED = 'SUCCEEDED', FAILED = 'FAILED', PAUSED = 'PAUSED', RUNNING = 'RUNNING' }
export enum PauseType { DELAY = 'DELAY' }
export enum StepOutputStatus { SUCCEEDED = 'SUCCEEDED', FAILED = 'FAILED' }

// Types & Classes
export type EngineGenericError = any;
export type FailedStep = any;
export type GenericStepOutput<T = any, V = any> = { type: T, output: V, status: StepOutputStatus };
export class LoopStepOutput { constructor(public props: any) {} }
export type LoopStepResult = any;
export type PauseMetadata = { type: PauseType, resumeDateTime?: string };
export type RespondResponse = any;
export type StepOutput = any;
export type FlowVersion = any;
export type RouterStepOutput = any;


// Utils
export const flowStructureUtil = {
    findStep: (flowVersion: any, stepName: string) => ({})
} as any;
export const spreadIfDefined = (val: any) => val;
export * from './lib/common/utils/is-nil';
export * from './lib/flows/types';
export * from './lib/common/utils/assert-equal';
