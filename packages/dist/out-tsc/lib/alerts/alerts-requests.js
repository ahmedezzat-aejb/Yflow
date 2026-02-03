"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAlertParams = exports.ListAlertsParams = void 0;
var apid_1 = require("../../../../common/src/apid"); // <-- Make sure this path and file exist, or update to the correct path
var typebox_1 = require("@sinclair/typebox");
var alerts_dto_1 = require("./alerts-dto");
exports.ListAlertsParams = typebox_1.Type.Object({
    projectId: apid_1.ApId,
    cursor: typebox_1.Type.Optional(typebox_1.Type.String()),
    limit: typebox_1.Type.Optional(typebox_1.Type.Integer({ minimum: 1, maximum: 100 })),
});
exports.CreateAlertParams = typebox_1.Type.Object({
    projectId: apid_1.ApId,
    channel: typebox_1.Type.Enum(alerts_dto_1.AlertChannel),
    receiver: typebox_1.Type.String({}),
});
