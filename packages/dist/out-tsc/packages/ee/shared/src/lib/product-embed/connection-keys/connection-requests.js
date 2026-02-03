import { Type } from '@sinclair/typebox';
import { ConnectionKeyType } from './connection-key';
export const GetOrDeleteConnectionFromTokenRequest = Type.Object({
    projectId: Type.String(),
    token: Type.String(),
    appName: Type.String(),
});
export const ListConnectionKeysRequest = Type.Object({
    limit: Type.Optional(Type.Number()),
    cursor: Type.Optional(Type.String({})),
});
export const UpsertApiKeyConnectionFromToken = Type.Object({
    appCredentialId: Type.String(),
    apiKey: Type.String(),
    token: Type.String(),
});
export const UpsertOAuth2ConnectionFromToken = Type.Object({
    appCredentialId: Type.String(),
    props: Type.Record(Type.String(), Type.Any()),
    token: Type.String(),
    code: Type.String(),
    redirectUrl: Type.String(),
});
export const UpsertConnectionFromToken = Type.Union([UpsertApiKeyConnectionFromToken, UpsertOAuth2ConnectionFromToken]);
export const UpsertSigningKeyConnection = Type.Object({
    settings: Type.Object({
        type: Type.Literal(ConnectionKeyType.SIGNING_KEY),
    }),
});
//# sourceMappingURL=connection-requests.js.map