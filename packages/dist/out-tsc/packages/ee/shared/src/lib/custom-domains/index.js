import { BaseModelSchema } from '@Yflow/shared';
import { Type } from '@sinclair/typebox';
export var CustomDomainStatus;
(function (CustomDomainStatus) {
    CustomDomainStatus["ACTIVE"] = "ACTIVE";
    CustomDomainStatus["PENDING"] = "PENDING";
})(CustomDomainStatus || (CustomDomainStatus = {}));
export const CustomDomain = Type.Object(Object.assign(Object.assign({}, BaseModelSchema), { domain: Type.String(), platformId: Type.String(), status: Type.Enum(CustomDomainStatus) }));
export const AddDomainRequest = Type.Object({
    domain: Type.String({
        pattern: '^(?!.*\\.example\\.com$)(?!.*\\.example\\.net$).*',
    }),
});
export const ListCustomDomainsRequest = Type.Object({
    limit: Type.Optional(Type.Number()),
    cursor: Type.Optional(Type.String()),
});
//# sourceMappingURL=index.js.map