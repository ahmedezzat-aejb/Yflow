// Clean Simple Piece Framework - No Dependencies
export interface CleanSimplePieceProp {
  type: 'text' | 'number' | 'boolean' | 'dropdown' | 'json' | 'date' | 'file';
  displayName: string;
  required?: boolean;
  defaultValue?: any;
  options?: Array<{ label: string; value: any }>;
  description?: string;
}

export interface CleanSimplePieceAction {
  name: string;
  displayName: string;
  description: string;
  props: Record<string, CleanSimplePieceProp>;
  run(context: any): Promise<any>;
}

export interface CleanSimplePieceContext {
  auth: any;
  propsValue: Record<string, any>;
  pieceName: string;
  stepName: string;
  flowId: string;
  projectId: string;
}

export interface CleanSimplePiece {
  displayName: string;
  description: string;
  logoUrl: string;
  authors: string[];
  categories: string[];
  auth: any;
  actions: CleanSimplePieceAction[];
  triggers: any[];
}

export function createCleanSimplePiece(config: {
  displayName: string;
  description: string;
  logoUrl: string;
  authors: string[];
  categories: string[];
  auth: any;
  actions: CleanSimplePieceAction[];
  triggers: any[];
}): CleanSimplePiece {
  return config;
}

export const CleanSimplePieceAuth = {
  None: () => ({ type: 'none' }),
  ApiKey: (config: any) => ({ type: 'api_key', config }),
  OAuth2: (config: any) => ({ type: 'oauth2', config }),
  BasicAuth: (config: any) => ({ type: 'basic_auth', config }),
  CustomAuth: (config: any) => ({ type: 'custom', config }),
};
