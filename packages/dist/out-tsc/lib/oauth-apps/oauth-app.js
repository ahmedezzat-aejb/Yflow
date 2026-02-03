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
exports.ListOAuth2AppRequest = exports.UpsertOAuth2AppRequest = exports.OAuthApp = void 0;
var shared_1 = require("@Yflow/shared");
var typebox_1 = require("@sinclair/typebox");
exports.OAuthApp = typebox_1.Type.Object(__assign(__assign({}, shared_1.BaseModelSchema), { pieceName: typebox_1.Type.String(), platformId: typebox_1.Type.String(), clientId: typebox_1.Type.String() }));
exports.UpsertOAuth2AppRequest = typebox_1.Type.Object({
    pieceName: typebox_1.Type.String(),
    clientId: typebox_1.Type.String(),
    clientSecret: typebox_1.Type.String(),
});
exports.ListOAuth2AppRequest = typebox_1.Type.Object({
    limit: typebox_1.Type.Optional(typebox_1.Type.Number()),
    cursor: typebox_1.Type.Optional(typebox_1.Type.String()),
});
