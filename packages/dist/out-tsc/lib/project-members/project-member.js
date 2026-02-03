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
exports.ProjectMemberWithUser = exports.ProjectMember = void 0;
var shared_1 = require("@Yflow/shared");
var typebox_1 = require("@sinclair/typebox");
exports.ProjectMember = typebox_1.Type.Object(__assign(__assign({}, shared_1.BaseModelSchema), { platformId: shared_1.ApId, userId: shared_1.ApId, projectId: typebox_1.Type.String(), projectRoleId: shared_1.ApId }), {
    description: 'Project member is which user is assigned to a project.',
});
exports.ProjectMemberWithUser = typebox_1.Type.Composite([exports.ProjectMember, typebox_1.Type.Object({
        user: shared_1.UserWithMetaInformation,
        projectRole: shared_1.ProjectRole,
        project: shared_1.ProjectMetaData,
    })]);
