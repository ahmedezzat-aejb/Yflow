import { ApId, SignUpRequest } from '@Yflow/shared';
import { Type } from '@sinclair/typebox';
export const VerifyEmailRequestBody = Type.Object({
    identityId: ApId,
    otp: Type.String(),
});
export const ResetPasswordRequestBody = Type.Object({
    identityId: ApId,
    otp: Type.String(),
    newPassword: Type.String(),
});
export const SignUpAndAcceptRequestBody = Type.Composite([
    Type.Omit(SignUpRequest, ['referringUserId', 'email']),
    Type.Object({
        invitationToken: Type.String(),
    }),
]);
//# sourceMappingURL=requests.js.map