"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProjectMemberRoleRequestBody = exports.AcceptProjectResponse = exports.ListProjectMembersRequestQuery = exports.AcceptInvitationRequest = void 0;
var typebox_1 = require("@sinclair/typebox");
exports.AcceptInvitationRequest = typebox_1.Type.Object({
    token: typebox_1.Type.String(),
});
exports.ListProjectMembersRequestQuery = typebox_1.Type.Object({
    projectId: typebox_1.Type.String(),
    projectRoleId: typebox_1.Type.Optional(typebox_1.Type.String()),
    cursor: typebox_1.Type.Optional(typebox_1.Type.String()),
    limit: typebox_1.Type.Optional(typebox_1.Type.Number()),
});
exports.AcceptProjectResponse = typebox_1.Type.Object({
    registered: typebox_1.Type.Boolean(),
});
exports.UpdateProjectMemberRoleRequestBody = typebox_1.Type.Object({
    role: typebox_1.Type.String(),
});
