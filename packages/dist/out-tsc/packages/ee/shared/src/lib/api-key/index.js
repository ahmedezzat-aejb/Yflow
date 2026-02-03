import { ApId, BaseModelSchema } from '@Yflow/shared';
import { Type } from '@sinclair/typebox';
export const ApiKey = Type.Object(Object.assign(Object.assign({}, BaseModelSchema), { platformId: ApId, displayName: Type.String(), hashedValue: Type.String(), truncatedValue: Type.String(), lastUsedAt: Type.Optional(Type.String()) }));
export const ApiKeyResponseWithValue = Type.Composite([
    Type.Omit(ApiKey, ['hashedValue']),
    Type.Object({
        value: Type.String(),
    }),
]);
export const ApiKeyResponseWithoutValue = Type.Omit(ApiKey, ['hashedValue']);
export const CreateApiKeyRequest = Type.Object({
    displayName: Type.String(),
});
//# sourceMappingURL=index.js.map