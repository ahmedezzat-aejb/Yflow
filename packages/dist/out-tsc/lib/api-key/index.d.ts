import { Static } from '@sinclair/typebox';
export declare const ApiKey: import("@sinclair/typebox").TObject<any>;
export type ApiKey = Static<typeof ApiKey>;
export declare const ApiKeyResponseWithValue: import("@sinclair/typebox").TObject<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: never;
}>;
export type ApiKeyResponseWithValue = Static<typeof ApiKeyResponseWithValue>;
export declare const ApiKeyResponseWithoutValue: import("@sinclair/typebox").TObject<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export type ApiKeyResponseWithoutValue = Static<typeof ApiKeyResponseWithoutValue>;
export declare const CreateApiKeyRequest: import("@sinclair/typebox").TObject<{
    displayName: import("@sinclair/typebox").TString;
}>;
export type CreateApiKeyRequest = Static<typeof CreateApiKeyRequest>;
