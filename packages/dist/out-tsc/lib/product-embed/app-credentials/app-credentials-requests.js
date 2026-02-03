"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpsertAppCredentialRequest = exports.UpsertOAuth2CredentialRequest = exports.UpsertApiKeyCredentialRequest = exports.ListAppCredentialsRequest = void 0;
var typebox_1 = require("@sinclair/typebox");
var app_credentials_1 = require("./app-credentials");
exports.ListAppCredentialsRequest = typebox_1.Type.Object({
    projectId: typebox_1.Type.String(),
    appName: typebox_1.Type.Optional(typebox_1.Type.String()),
    limit: typebox_1.Type.Optional(typebox_1.Type.Number()),
    cursor: typebox_1.Type.Optional(typebox_1.Type.String({})),
});
exports.UpsertApiKeyCredentialRequest = typebox_1.Type.Object({
    id: typebox_1.Type.Optional(typebox_1.Type.String()),
    appName: typebox_1.Type.String(),
    settings: typebox_1.Type.Object({
        type: typebox_1.Type.Literal(app_credentials_1.AppCredentialType.API_KEY),
    }),
});
exports.UpsertOAuth2CredentialRequest = typebox_1.Type.Object({
    id: typebox_1.Type.Optional(typebox_1.Type.String()),
    appName: typebox_1.Type.String(),
    settings: typebox_1.Type.Object({
        type: typebox_1.Type.Literal(app_credentials_1.AppCredentialType.OAUTH2),
        authUrl: typebox_1.Type.String({}),
        scope: typebox_1.Type.String(),
        tokenUrl: typebox_1.Type.String({}),
        clientId: typebox_1.Type.String({}),
        clientSecret: typebox_1.Type.String({}),
    }),
});
exports.UpsertAppCredentialRequest = typebox_1.Type.Union([exports.UpsertOAuth2CredentialRequest, exports.UpsertApiKeyCredentialRequest]);
