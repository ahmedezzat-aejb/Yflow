"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignUpAndAcceptRequestBody = exports.ResetPasswordRequestBody = exports.VerifyEmailRequestBody = void 0;
var shared_1 = require("@Yflow/shared");
var typebox_1 = require("@sinclair/typebox");
exports.VerifyEmailRequestBody = typebox_1.Type.Object({
    identityId: shared_1.ApId,
    otp: typebox_1.Type.String(),
});
exports.ResetPasswordRequestBody = typebox_1.Type.Object({
    identityId: shared_1.ApId,
    otp: typebox_1.Type.String(),
    newPassword: typebox_1.Type.String(),
});
exports.SignUpAndAcceptRequestBody = typebox_1.Type.Composite([
    typebox_1.Type.Omit(shared_1.SignUpRequest, ['referringUserId', 'email']),
    typebox_1.Type.Object({
        invitationToken: typebox_1.Type.String(),
    }),
]);
