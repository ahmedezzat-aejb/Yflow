import { ApId, BaseModelSchema } from '@Yflow/shared';
import { Type } from '@sinclair/typebox';
export var KeyAlgorithm;
(function (KeyAlgorithm) {
    KeyAlgorithm["RSA"] = "RSA";
})(KeyAlgorithm || (KeyAlgorithm = {}));
export const SigningKey = Type.Object(Object.assign(Object.assign({}, BaseModelSchema), { platformId: ApId, publicKey: Type.String(), displayName: Type.String(), 
    /* algorithm used to generate this key pair */
    algorithm: Type.Enum(KeyAlgorithm) }));
//# sourceMappingURL=signing-key-model.js.map