import { Static } from '@sinclair/typebox';
import { AppCredentialType } from './app-credentials';
export declare const ListAppCredentialsRequest: import("@sinclair/typebox").TObject<{
    projectId: import("@sinclair/typebox").TString;
    appName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    limit: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TNumber>;
    cursor: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export type ListAppCredentialsRequest = Static<typeof ListAppCredentialsRequest>;
export declare const UpsertApiKeyCredentialRequest: import("@sinclair/typebox").TObject<{
    id: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    appName: import("@sinclair/typebox").TString;
    settings: import("@sinclair/typebox").TObject<{
        type: import("@sinclair/typebox").TLiteral<AppCredentialType.API_KEY>;
    }>;
}>;
export declare const UpsertOAuth2CredentialRequest: import("@sinclair/typebox").TObject<{
    id: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    appName: import("@sinclair/typebox").TString;
    settings: import("@sinclair/typebox").TObject<{
        type: import("@sinclair/typebox").TLiteral<AppCredentialType.OAUTH2>;
        authUrl: import("@sinclair/typebox").TString;
        scope: import("@sinclair/typebox").TString;
        tokenUrl: import("@sinclair/typebox").TString;
        clientId: import("@sinclair/typebox").TString;
        clientSecret: import("@sinclair/typebox").TString;
    }>;
}>;
export declare const UpsertAppCredentialRequest: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TObject<{
    id: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    appName: import("@sinclair/typebox").TString;
    settings: import("@sinclair/typebox").TObject<{
        type: import("@sinclair/typebox").TLiteral<AppCredentialType.OAUTH2>;
        authUrl: import("@sinclair/typebox").TString;
        scope: import("@sinclair/typebox").TString;
        tokenUrl: import("@sinclair/typebox").TString;
        clientId: import("@sinclair/typebox").TString;
        clientSecret: import("@sinclair/typebox").TString;
    }>;
}>, import("@sinclair/typebox").TObject<{
    id: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    appName: import("@sinclair/typebox").TString;
    settings: import("@sinclair/typebox").TObject<{
        type: import("@sinclair/typebox").TLiteral<AppCredentialType.API_KEY>;
    }>;
}>]>;
export type UpsertAppCredentialRequest = Static<typeof UpsertAppCredentialRequest>;
