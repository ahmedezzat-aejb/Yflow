import { BaseModelSchema } from '@Yflow/shared';
import { Type } from '@sinclair/typebox';
export const OAuthApp = Type.Object(Object.assign(Object.assign({}, BaseModelSchema), { pieceName: Type.String(), platformId: Type.String(), clientId: Type.String() }));
export const UpsertOAuth2AppRequest = Type.Object({
    pieceName: Type.String(),
    clientId: Type.String(),
    clientSecret: Type.String(),
});
export const ListOAuth2AppRequest = Type.Object({
    limit: Type.Optional(Type.Number()),
    cursor: Type.Optional(Type.String()),
});
//# sourceMappingURL=oauth-app.js.map