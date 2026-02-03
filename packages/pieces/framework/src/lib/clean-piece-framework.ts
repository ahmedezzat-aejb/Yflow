// Clean Piece Framework - No Dependencies
export interface CleanPieceProp {
  type: 'text' | 'number' | 'boolean' | 'dropdown' | 'json' | 'date' | 'file';
  displayName: string;
  required?: boolean;
  defaultValue?: any;
  options?: Array<{ label: string; value: any }>;
  description?: string;
}

export interface CleanPieceAction {
  name: string;
  displayName: string;
  description: string;
  props: Record<string, CleanPieceProp>;
  run(context: any): Promise<any>;
}

export interface CleanPieceContext {
  auth: any;
  propsValue: Record<string, any>;
  pieceName: string;
  stepName: string;
  flowId: string;
  projectId: string;
}

export interface CleanPiece {
  displayName: string;
  description: string;
  logoUrl: string;
  authors: string[];
  categories: string[];
  auth: any;
  actions: CleanPieceAction[];
  triggers: any[];
}

export function createCleanPiece(config: {
  displayName: string;
  description: string;
  logoUrl: string;
  authors: string[];
  categories: string[];
  auth: any;
  actions: CleanPieceAction[];
  triggers: any[];
}): CleanPiece {
  return config;
}

export const CleanPieceAuth = {
  None: () => ({ type: 'none' }),
  ApiKey: (config: any) => ({ type: 'api_key', config }),
  OAuth2: (config: any) => ({ type: 'oauth2', config }),
  BasicAuth: (config: any) => ({ type: 'basic_auth', config }),
  CustomAuth: (config: any) => ({ type: 'custom', config }),
};
