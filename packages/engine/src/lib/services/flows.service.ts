// @ts-nocheck
import { FlowsContext, ListFlowsContextParams } from '@Yflow/pieces-framework'
import { PopulatedFlow, SeekPage } from '@Yflow'


type CreateFlowsServiceParams = {
    engineToken: string
    internalApiUrl: string
    flowId: string
    flowVersionId: string
}
export const createFlowsContext = ({ engineToken, internalApiUrl, flowId, flowVersionId }: CreateFlowsServiceParams): FlowsContext => {
    return {
        async list(params: ListFlowsContextParams): Promise<SeekPage<PopulatedFlow>> {
            const queryParams = new URLSearchParams()
            if (params?.externalIds) {
                queryParams.set('externalIds', params.externalIds.join(','))
            }
            const response = await fetch(`${internalApiUrl}v1/engine/populated-flows?${queryParams.toString()}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${engineToken}`,
                },
            })
            return response.json()
        },
        current: {
            id: flowId,
            version: {
                id: flowVersionId,
            },
        },
    }
}
