// packages/shared/src/lib/flows/types.ts

// Enums اللي الـ Engine محتاجها
export enum ActionType { PIECE = 'PIECE', CODE = 'CODE', LOOP_ON_ITEMS = 'LOOP_ON_ITEMS', ROUTER = 'ROUTER' }
export enum TriggerType { EMPTY = 'EMPTY', PIECE = 'PIECE', WEBHOOK = 'WEBHOOK' }
export enum FlowRunStatus { SUCCEEDED = 'SUCCEEDED', FAILED = 'FAILED', PAUSED = 'PAUSED', RUNNING = 'RUNNING' }
export enum StepOutputStatus { SUCCEEDED = 'SUCCEEDED', FAILED = 'FAILED' }
export enum PauseType { DELAY = 'DELAY' }

// Types
export type EngineGenericError = any;
export type FailedStep = any;
export type GenericStepOutput<T = any, V = any> = { type: T, output: V, status: StepOutputStatus };
export type StepOutput = any;
export type FlowVersion = any;
export type PauseMetadata = { type: PauseType, resumeDateTime?: string };
export type RespondResponse = any;
export type LoopStepResult = any;
export type RouterStepOutput = any;

// Classes & Utils
export class LoopStepOutput { constructor(public props: any = {}) {} }
export const spreadIfDefined = (val: any) => val;
export const flowStructureUtil = {
    findStep: (flowVersion: any, stepName: string) => ({})
} as any;
