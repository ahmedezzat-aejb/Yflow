import { Static } from '@sinclair/typebox';
import { ConnectionKeyType } from './connection-key';
export declare const GetOrDeleteConnectionFromTokenRequest: import("@sinclair/typebox").TObject<{
    projectId: import("@sinclair/typebox").TString;
    token: import("@sinclair/typebox").TString;
    appName: import("@sinclair/typebox").TString;
}>;
export type GetOrDeleteConnectionFromTokenRequest = Static<typeof GetOrDeleteConnectionFromTokenRequest>;
export declare const ListConnectionKeysRequest: import("@sinclair/typebox").TObject<{
    limit: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TNumber>;
    cursor: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export type ListConnectionKeysRequest = Static<typeof ListConnectionKeysRequest>;
export declare const UpsertApiKeyConnectionFromToken: import("@sinclair/typebox").TObject<{
    appCredentialId: import("@sinclair/typebox").TString;
    apiKey: import("@sinclair/typebox").TString;
    token: import("@sinclair/typebox").TString;
}>;
export type UpsertApiKeyConnectionFromToken = Static<typeof UpsertApiKeyConnectionFromToken>;
export declare const UpsertOAuth2ConnectionFromToken: import("@sinclair/typebox").TObject<{
    appCredentialId: import("@sinclair/typebox").TString;
    props: import("@sinclair/typebox").TRecord<import("@sinclair/typebox").TString, import("@sinclair/typebox").TAny>;
    token: import("@sinclair/typebox").TString;
    code: import("@sinclair/typebox").TString;
    redirectUrl: import("@sinclair/typebox").TString;
}>;
export type UpsertOAuth2ConnectionFromToken = Static<typeof UpsertOAuth2ConnectionFromToken>;
export declare const UpsertConnectionFromToken: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TObject<{
    appCredentialId: import("@sinclair/typebox").TString;
    apiKey: import("@sinclair/typebox").TString;
    token: import("@sinclair/typebox").TString;
}>, import("@sinclair/typebox").TObject<{
    appCredentialId: import("@sinclair/typebox").TString;
    props: import("@sinclair/typebox").TRecord<import("@sinclair/typebox").TString, import("@sinclair/typebox").TAny>;
    token: import("@sinclair/typebox").TString;
    code: import("@sinclair/typebox").TString;
    redirectUrl: import("@sinclair/typebox").TString;
}>]>;
export type UpsertConnectionFromToken = Static<typeof UpsertConnectionFromToken>;
export declare const UpsertSigningKeyConnection: import("@sinclair/typebox").TObject<{
    settings: import("@sinclair/typebox").TObject<{
        type: import("@sinclair/typebox").TLiteral<ConnectionKeyType>;
    }>;
}>;
export type UpsertSigningKeyConnection = Static<typeof UpsertSigningKeyConnection>;
