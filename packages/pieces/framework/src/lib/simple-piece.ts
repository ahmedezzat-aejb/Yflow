// Simple Piece Framework - No Complex Dependencies

export interface SimplePieceProp {
  type: 'text' | 'number' | 'boolean' | 'dropdown' | 'json' | 'date' | 'file';
  displayName: string;
  required?: boolean;
  defaultValue?: any;
  options?: Array<{ label: string; value: any }>;
  description?: string;
}

export interface SimplePieceAction {
  name: string;
  displayName: string;
  description: string;
  props: Record<string, SimplePieceProp>;
  run(context: SimplePieceContext): Promise<any>;
}

export interface SimplePieceContext {
  auth: any;
  propsValue: Record<string, any>;
  pieceName: string;
  stepName: string;
  flowId: string;
  projectId: string;
}

export interface SimplePiece {
  displayName: string;
  description: string;
  logoUrl: string;
  authors: string[];
  categories: string[];
  auth: any;
  actions: SimplePieceAction[];
  triggers: any[];
}

export function createSimplePiece(config: {
  displayName: string;
  description: string;
  logoUrl: string;
  authors: string[];
  categories: string[];
  auth: any;
  actions: SimplePieceAction[];
  triggers: any[];
}): SimplePiece {
  return config;
}

export const SimplePieceAuth = {
  None: () => ({ type: 'none' }),
  ApiKey: (config: any) => ({ type: 'api_key', config }),
  OAuth2: (config: any) => ({ type: 'oauth2', config }),
  BasicAuth: (config: any) => ({ type: 'basic_auth', config }),
  CustomAuth: (config: any) => ({ type: 'custom', config }),
};

export type SimplePieceActionType = SimplePieceAction;
export type SimplePieceContextType = SimplePieceContext;
export type SimplePieceType = SimplePiece;
