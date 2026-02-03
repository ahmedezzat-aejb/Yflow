"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpsertSigningKeyConnection = exports.UpsertConnectionFromToken = exports.UpsertOAuth2ConnectionFromToken = exports.UpsertApiKeyConnectionFromToken = exports.ListConnectionKeysRequest = exports.GetOrDeleteConnectionFromTokenRequest = void 0;
var typebox_1 = require("@sinclair/typebox");
var connection_key_1 = require("./connection-key");
exports.GetOrDeleteConnectionFromTokenRequest = typebox_1.Type.Object({
    projectId: typebox_1.Type.String(),
    token: typebox_1.Type.String(),
    appName: typebox_1.Type.String(),
});
exports.ListConnectionKeysRequest = typebox_1.Type.Object({
    limit: typebox_1.Type.Optional(typebox_1.Type.Number()),
    cursor: typebox_1.Type.Optional(typebox_1.Type.String({})),
});
exports.UpsertApiKeyConnectionFromToken = typebox_1.Type.Object({
    appCredentialId: typebox_1.Type.String(),
    apiKey: typebox_1.Type.String(),
    token: typebox_1.Type.String(),
});
exports.UpsertOAuth2ConnectionFromToken = typebox_1.Type.Object({
    appCredentialId: typebox_1.Type.String(),
    props: typebox_1.Type.Record(typebox_1.Type.String(), typebox_1.Type.Any()),
    token: typebox_1.Type.String(),
    code: typebox_1.Type.String(),
    redirectUrl: typebox_1.Type.String(),
});
exports.UpsertConnectionFromToken = typebox_1.Type.Union([exports.UpsertApiKeyConnectionFromToken, exports.UpsertOAuth2ConnectionFromToken]);
exports.UpsertSigningKeyConnection = typebox_1.Type.Object({
    settings: typebox_1.Type.Object({
        type: typebox_1.Type.Literal(connection_key_1.ConnectionKeyType.SIGNING_KEY),
    }),
});
