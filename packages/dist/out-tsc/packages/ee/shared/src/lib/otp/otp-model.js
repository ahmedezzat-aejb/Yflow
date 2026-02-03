import { ApId, BaseModelSchema } from '@Yflow/shared';
import { Type } from '@sinclair/typebox';
import { OtpType } from './otp-type';
export var OtpState;
(function (OtpState) {
    OtpState["PENDING"] = "PENDING";
    OtpState["CONFIRMED"] = "CONFIRMED";
})(OtpState || (OtpState = {}));
export const OtpModel = Type.Object(Object.assign(Object.assign({}, BaseModelSchema), { type: Type.Enum(OtpType), identityId: ApId, value: Type.String(), state: Type.Enum(OtpState) }));
//# sourceMappingURL=otp-model.js.map