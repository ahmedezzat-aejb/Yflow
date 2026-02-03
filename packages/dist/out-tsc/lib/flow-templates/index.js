"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateFlowTemplateRequest = void 0;
var shared_1 = require("@Yflow/shared");
var typebox_1 = require("@sinclair/typebox");
exports.CreateFlowTemplateRequest = typebox_1.Type.Object({
    description: typebox_1.Type.Optional(typebox_1.Type.String()),
    template: shared_1.FlowVersionTemplate,
    blogUrl: typebox_1.Type.Optional(typebox_1.Type.String()),
    type: typebox_1.Type.Enum(shared_1.TemplateType),
    tags: typebox_1.Type.Optional(typebox_1.Type.Array(typebox_1.Type.String())),
    id: typebox_1.Type.Optional(typebox_1.Type.String()),
    metadata: (0, shared_1.Nullable)(shared_1.Metadata),
});
