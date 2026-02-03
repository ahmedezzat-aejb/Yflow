"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpModel = exports.OtpState = void 0;
var shared_1 = require("@Yflow/shared");
var typebox_1 = require("@sinclair/typebox");
var otp_type_1 = require("./otp-type");
var OtpState;
(function (OtpState) {
    OtpState["PENDING"] = "PENDING";
    OtpState["CONFIRMED"] = "CONFIRMED";
})(OtpState || (exports.OtpState = OtpState = {}));
exports.OtpModel = typebox_1.Type.Object(__assign(__assign({}, shared_1.BaseModelSchema), { type: typebox_1.Type.Enum(otp_type_1.OtpType), identityId: shared_1.ApId, value: typebox_1.Type.String(), state: typebox_1.Type.Enum(OtpState) }));
