export const isNil = (value: unknown): value is null | undefined => {
    return value === null || value === undefined;
};
export enum ActionType { PIECE = 'PIECE', CODE = 'CODE', LOOP_ON_ITEMS = 'LOOP_ON_ITEMS', ROUTER = 'ROUTER' }
export enum FlowRunStatus { SUCCEEDED = 'SUCCEEDED', FAILED = 'FAILED', PAUSED = 'PAUSED', RUNNING = 'RUNNING' }
export enum StepOutputStatus { SUCCEEDED = 'SUCCEEDED', FAILED = 'FAILED' }
export enum PauseType { DELAY = 'DELAY' }
export type FlowVersion = any;
export type GenericStepOutput<T = any, V = any> = { type: T, output: V, status: StepOutputStatus };
export type RouterStepOutput = any;
export const spreadIfDefined = (val: any) => val;
export const flowStructureUtil = { findStep: (v: any, s: string) => ({}) } as any;

