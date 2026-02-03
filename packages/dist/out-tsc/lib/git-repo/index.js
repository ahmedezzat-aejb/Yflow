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
exports.ConfigureRepoRequest = exports.PushGitRepoRequest = exports.PushEverythingGitRepoRequest = exports.PushTablesGitRepoRequest = exports.PushFlowsGitRepoRequest = exports.GitPushOperationType = exports.GitRepoWithoutSensitiveData = exports.GitRepo = exports.GitBranchType = void 0;
var shared_1 = require("@Yflow/shared");
var typebox_1 = require("@sinclair/typebox");
var GitBranchType;
(function (GitBranchType) {
    GitBranchType["PRODUCTION"] = "PRODUCTION";
    GitBranchType["DEVELOPMENT"] = "DEVELOPMENT";
})(GitBranchType || (exports.GitBranchType = GitBranchType = {}));
exports.GitRepo = typebox_1.Type.Object(__assign(__assign({}, shared_1.BaseModelSchema), { remoteUrl: typebox_1.Type.String(), branch: typebox_1.Type.String(), branchType: typebox_1.Type.Enum(GitBranchType), projectId: typebox_1.Type.String(), sshPrivateKey: typebox_1.Type.String(), slug: typebox_1.Type.String() }));
exports.GitRepoWithoutSensitiveData = typebox_1.Type.Omit(exports.GitRepo, ['sshPrivateKey']);
var GitPushOperationType;
(function (GitPushOperationType) {
    GitPushOperationType["PUSH_FLOW"] = "PUSH_FLOW";
    GitPushOperationType["DELETE_FLOW"] = "DELETE_FLOW";
    GitPushOperationType["PUSH_TABLE"] = "PUSH_TABLE";
    GitPushOperationType["DELETE_TABLE"] = "DELETE_TABLE";
    GitPushOperationType["PUSH_EVERYTHING"] = "PUSH_EVERYTHING";
})(GitPushOperationType || (exports.GitPushOperationType = GitPushOperationType = {}));
exports.PushFlowsGitRepoRequest = typebox_1.Type.Object({
    type: typebox_1.Type.Union([typebox_1.Type.Literal(GitPushOperationType.PUSH_FLOW), typebox_1.Type.Literal(GitPushOperationType.DELETE_FLOW)]),
    commitMessage: typebox_1.Type.String({
        minLength: 1,
    }),
    externalFlowIds: typebox_1.Type.Array(typebox_1.Type.String()),
});
exports.PushTablesGitRepoRequest = typebox_1.Type.Object({
    type: typebox_1.Type.Union([typebox_1.Type.Literal(GitPushOperationType.PUSH_TABLE), typebox_1.Type.Literal(GitPushOperationType.DELETE_TABLE)]),
    commitMessage: typebox_1.Type.String({
        minLength: 1,
    }),
    externalTableIds: typebox_1.Type.Array(typebox_1.Type.String()),
});
exports.PushEverythingGitRepoRequest = typebox_1.Type.Object({
    type: typebox_1.Type.Literal(GitPushOperationType.PUSH_EVERYTHING),
    commitMessage: typebox_1.Type.String({
        minLength: 1,
    }),
});
exports.PushGitRepoRequest = typebox_1.Type.Union([exports.PushFlowsGitRepoRequest, exports.PushTablesGitRepoRequest, exports.PushEverythingGitRepoRequest]);
exports.ConfigureRepoRequest = typebox_1.Type.Object({
    projectId: typebox_1.Type.String({
        minLength: 1,
    }),
    remoteUrl: typebox_1.Type.String({
        pattern: '^git@',
    }),
    branch: typebox_1.Type.String({
        minLength: 1,
    }),
    branchType: typebox_1.Type.Enum(GitBranchType),
    sshPrivateKey: typebox_1.Type.String({
        minLength: 1,
    }),
    slug: typebox_1.Type.String({
        minLength: 1,
    }),
});
