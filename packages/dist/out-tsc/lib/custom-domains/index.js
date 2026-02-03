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
exports.ListCustomDomainsRequest = exports.AddDomainRequest = exports.CustomDomain = exports.CustomDomainStatus = void 0;
var shared_1 = require("@Yflow/shared");
var typebox_1 = require("@sinclair/typebox");
var CustomDomainStatus;
(function (CustomDomainStatus) {
    CustomDomainStatus["ACTIVE"] = "ACTIVE";
    CustomDomainStatus["PENDING"] = "PENDING";
})(CustomDomainStatus || (exports.CustomDomainStatus = CustomDomainStatus = {}));
exports.CustomDomain = typebox_1.Type.Object(__assign(__assign({}, shared_1.BaseModelSchema), { domain: typebox_1.Type.String(), platformId: typebox_1.Type.String(), status: typebox_1.Type.Enum(CustomDomainStatus) }));
exports.AddDomainRequest = typebox_1.Type.Object({
    domain: typebox_1.Type.String({
        pattern: '^(?!.*\\.example\\.com$)(?!.*\\.example\\.net$).*',
    }),
});
exports.ListCustomDomainsRequest = typebox_1.Type.Object({
    limit: typebox_1.Type.Optional(typebox_1.Type.Number()),
    cursor: typebox_1.Type.Optional(typebox_1.Type.String()),
});
