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
exports.Alert = exports.AlertChannel = void 0;
// Update the import path below to the correct location of your shared module
var index_1 = require("../../../../../shared/src/index");
var typebox_1 = require("@sinclair/typebox");
var AlertChannel;
(function (AlertChannel) {
    AlertChannel["EMAIL"] = "EMAIL";
})(AlertChannel || (exports.AlertChannel = AlertChannel = {}));
exports.Alert = typebox_1.Type.Object(__assign(__assign({}, index_1.BaseModelSchema), { projectId: index_1.ApId, channel: typebox_1.Type.Enum(AlertChannel), receiver: typebox_1.Type.String({}) }));
