export type PieceAuth = PieceAuthNone | PieceAuthOAuth2 | PieceAuthApiKey | PieceAuthBasicAuth | PieceAuthCustom;

export interface PieceAuthNone {
  type: 'none';
}

export interface PieceAuthOAuth2 {
  type: 'oauth2';
  config: OAuth2Config;
}

export interface PieceAuthApiKey {
  type: 'api_key';
  config: ApiKeyConfig;
}

export interface PieceAuthBasicAuth {
  type: 'basic_auth';
  config: BasicAuthConfig;
}

export interface PieceAuthCustom {
  type: 'custom';
  config: CustomAuthConfig;
}

export const PieceAuthHelpers = {
  None: (): PieceAuthNone => ({ type: 'none' }),
  OAuth2: (config: OAuth2Config): PieceAuthOAuth2 => ({ type: 'oauth2', config }),
  ApiKey: (config: ApiKeyConfig): PieceAuthApiKey => ({ type: 'api_key', config }),
  BasicAuth: (config: BasicAuthConfig): PieceAuthBasicAuth => ({ type: 'basic_auth', config }),
  CustomAuth: (config: CustomAuthConfig): PieceAuthCustom => ({ type: 'custom', config }),
};

export interface OAuth2Config {
  clientId: string;
  clientSecret: string;
  authorizationUrl: string;
  tokenUrl: string;
  scopes: string[];
}

export interface ApiKeyConfig {
  apiKey: string;
  headerName?: string;
  queryParamName?: string;
}

export interface BasicAuthConfig {
  username: string;
  password: string;
}

export interface CustomAuthConfig {
  props: Record<string, any>;
  required: string[];
}

export interface PieceProp {
  type: 'text' | 'number' | 'boolean' | 'dropdown' | 'json' | 'date' | 'file';
  displayName: string;
  required?: boolean;
  defaultValue?: any;
  options?: Array<{ label: string; value: any }>;
  description?: string;
}

export interface PieceAction {
  name: string;
  displayName: string;
  description: string;
  props: Record<string, PieceProp>;
  run(context: PieceContext): Promise<any>;
}

export interface PieceTrigger {
  name: string;
  displayName: string;
  description: string;
  props: Record<string, PieceProp>;
  run(context: PieceContext): Promise<any>;
  onEnable?(context: PieceContext): Promise<void>;
  onDisable?(context: PieceContext): Promise<void>;
}

export interface PieceContext {
  auth: any;
  propsValue: Record<string, any>;
  pieceName: string;
  stepName: string;
  flowId: string;
  projectId: string;
}

export interface Piece {
  displayName: string;
  description: string;
  logoUrl: string;
  authors: string[];
  categories: string[];
  auth: PieceAuth;
  actions: PieceAction[];
  triggers: PieceTrigger[];
}

export function createPiece(config: {
  displayName: string;
  description: string;
  logoUrl: string;
  authors: string[];
  categories: string[];
  auth: PieceAuth;
  actions: PieceAction[];
  triggers: PieceTrigger[];
}): Piece {
  return config;
}

