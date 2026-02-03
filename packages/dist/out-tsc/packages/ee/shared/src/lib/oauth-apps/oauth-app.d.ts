import { Static } from '@sinclair/typebox';
export declare const OAuthApp: import("@sinclair/typebox").TObject<any>;
export type OAuthApp = Static<typeof OAuthApp>;
export declare const UpsertOAuth2AppRequest: import("@sinclair/typebox").TObject<{
    pieceName: import("@sinclair/typebox").TString;
    clientId: import("@sinclair/typebox").TString;
    clientSecret: import("@sinclair/typebox").TString;
}>;
export type UpsertOAuth2AppRequest = Static<typeof UpsertOAuth2AppRequest>;
export declare const ListOAuth2AppRequest: import("@sinclair/typebox").TObject<{
    limit: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TNumber>;
    cursor: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export type ListOAuth2AppRequest = Static<typeof ListOAuth2AppRequest>;
