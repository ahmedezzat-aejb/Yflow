// Clean Piece Context - No Dependencies
export interface PieceContext {
    propsValue: Record<string, any>;
    store: any;
    auth: any;
    pieceName: string;
    stepName: string;
    flowId: string;
    projectId: string;
}

export const LATEST_CONTEXT_VERSION = '1';

export function createContext(config: Partial<PieceContext>): PieceContext {
    return {
        propsValue: {},
        store: {},
        auth: null,
        pieceName: '',
        stepName: '',
        flowId: '',
        projectId: '',
        ...config,
    };
}
