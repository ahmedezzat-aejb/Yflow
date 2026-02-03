"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOtpRequestBody = void 0;
var typebox_1 = require("@sinclair/typebox");
var otp_type_1 = require("./otp-type");
exports.CreateOtpRequestBody = typebox_1.Type.Object({
    email: typebox_1.Type.String(),
    type: typebox_1.Type.Enum(otp_type_1.OtpType),
});
