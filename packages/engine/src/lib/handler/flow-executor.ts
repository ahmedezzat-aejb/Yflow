// @ts-nocheck
import { performance } from 'node:perf_hooks'
import {
    YflowError,
    ErrorCode,
    ExecuteFlowOperation,
    ExecutionType,
    FlowAction,
    ActionType,
    FlowRunStatus,
    isNil
} from '@Yflow/shared'
import { triggerHelper } from '../helper/trigger-helper'
import { progressService } from '../services/progress.service'
import { BaseExecutor } from './base-executor'
import { codeExecutor } from './code-executor'
import { EngineConstants } from './context/engine-constants'
import { FlowExecutorContext } from './context/flow-execution-context'
import { loopExecutor } from './loop-executor'
import { pieceExecutor } from './piece-executor'
import { routerExecuter } from './router-executor'

function getExecuteFunction(): Record<ActionType, BaseExecutor<FlowAction>> {
    return {
        [ActionType.CODE]: codeExecutor,
        [ActionType.LOOP_ON_ITEMS]: loopExecutor,
        [ActionType.PIECE]: pieceExecutor,
        [ActionType.ROUTER]: routerExecuter,
    }
}

export const flowExecutor = {
    getExecutorForAction(type: ActionType): BaseExecutor<FlowAction> {
        const executeFunction = getExecuteFunction()
        const executor = executeFunction[type]

        if (isNil(executor)) {
            throw new YflowError({
                code: ErrorCode.ENGINE_GENERIC_ERROR,
                params: { message: `Executor not found for action type: ${type}` }
            })
        }

        return executor
    },

    async executeFromTrigger({ executionState, constants, input }: {
        executionState: FlowExecutorContext
        constants: EngineConstants
        input: ExecuteFlowOperation
    }): Promise<FlowExecutorContext> {
        const trigger = input.flowVersion.trigger
        if (input.executionType === ExecutionType.BEGIN) {
            await triggerHelper.executeOnStart(trigger, constants, input.triggerPayload)
        }
        return flowExecutor.execute({
            action: trigger.nextAction,
            executionState,
            constants,
        })
    },

    async execute({ action, constants, executionState }: {
        action: FlowAction | null | undefined
        executionState: FlowExecutorContext
        constants: EngineConstants
    }): Promise<FlowExecutorContext> {
        const flowStartTime = performance.now()
        let flowExecutionContext = executionState
        let currentAction: FlowAction | null | undefined = action

        while (!isNil(currentAction)) {
            const testSingleStepMode = !isNil(constants.stepNameToTest)
            if (currentAction.skip && !testSingleStepMode) {
                currentAction = currentAction.nextAction
                continue
            }
            const handler = this.getExecutorForAction(currentAction.type)

            // تحديث حالة التقدم في Yflow
            progressService.sendUpdate({
                engineConstants: constants,
                flowExecutorContext: flowExecutionContext,
            }).catch(error => {
                console.error('Yflow Progress Error:', error)
            })

            flowExecutionContext = await handler.handle({
                action: currentAction,
                executionState: flowExecutionContext,
                constants,
            })

            const shouldBreakExecution = flowExecutionContext.verdict.status !== FlowRunStatus.RUNNING || testSingleStepMode

            if (shouldBreakExecution) {
                break
            }

            currentAction = currentAction.nextAction
        }

        const flowEndTime = performance.now()
        return flowExecutionContext.setDuration(flowEndTime - flowStartTime)
    },
}
