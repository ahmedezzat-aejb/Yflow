// @ts-nocheck
import { FlowAction } from '@Yflow/shared'
import { EngineConstants } from './context/engine-constants'
import { FlowExecutorContext } from './context/flow-execution-context'

export interface BaseExecutor<T extends FlowAction> {
    handle(request: {
        action: T
        executionState: FlowExecutorContext
        constants: EngineConstants
    }): Promise<FlowExecutorContext>
}

// ضيفنا دي عشان الـ Type checking يكون أقوى في الـ Engine
export abstract class AbstractExecutor<T extends FlowAction> implements BaseExecutor<T> {
    abstract handle(request: {
        action: T
        executionState: FlowExecutorContext
        constants: EngineConstants
    }): Promise<FlowExecutorContext>
}
