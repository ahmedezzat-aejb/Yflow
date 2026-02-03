import { BaseModelSchema } from '@Yflow/shared';
import { Type } from '@sinclair/typebox';
export var GitBranchType;
(function (GitBranchType) {
    GitBranchType["PRODUCTION"] = "PRODUCTION";
    GitBranchType["DEVELOPMENT"] = "DEVELOPMENT";
})(GitBranchType || (GitBranchType = {}));
export const GitRepo = Type.Object(Object.assign(Object.assign({}, BaseModelSchema), { remoteUrl: Type.String(), branch: Type.String(), branchType: Type.Enum(GitBranchType), projectId: Type.String(), sshPrivateKey: Type.String(), slug: Type.String() }));
export const GitRepoWithoutSensitiveData = Type.Omit(GitRepo, ['sshPrivateKey']);
export var GitPushOperationType;
(function (GitPushOperationType) {
    GitPushOperationType["PUSH_FLOW"] = "PUSH_FLOW";
    GitPushOperationType["DELETE_FLOW"] = "DELETE_FLOW";
    GitPushOperationType["PUSH_TABLE"] = "PUSH_TABLE";
    GitPushOperationType["DELETE_TABLE"] = "DELETE_TABLE";
    GitPushOperationType["PUSH_EVERYTHING"] = "PUSH_EVERYTHING";
})(GitPushOperationType || (GitPushOperationType = {}));
export const PushFlowsGitRepoRequest = Type.Object({
    type: Type.Union([Type.Literal(GitPushOperationType.PUSH_FLOW), Type.Literal(GitPushOperationType.DELETE_FLOW)]),
    commitMessage: Type.String({
        minLength: 1,
    }),
    externalFlowIds: Type.Array(Type.String()),
});
export const PushTablesGitRepoRequest = Type.Object({
    type: Type.Union([Type.Literal(GitPushOperationType.PUSH_TABLE), Type.Literal(GitPushOperationType.DELETE_TABLE)]),
    commitMessage: Type.String({
        minLength: 1,
    }),
    externalTableIds: Type.Array(Type.String()),
});
export const PushEverythingGitRepoRequest = Type.Object({
    type: Type.Literal(GitPushOperationType.PUSH_EVERYTHING),
    commitMessage: Type.String({
        minLength: 1,
    }),
});
export const PushGitRepoRequest = Type.Union([PushFlowsGitRepoRequest, PushTablesGitRepoRequest, PushEverythingGitRepoRequest]);
export const ConfigureRepoRequest = Type.Object({
    projectId: Type.String({
        minLength: 1,
    }),
    remoteUrl: Type.String({
        pattern: '^git@',
    }),
    branch: Type.String({
        minLength: 1,
    }),
    branchType: Type.Enum(GitBranchType),
    sshPrivateKey: Type.String({
        minLength: 1,
    }),
    slug: Type.String({
        minLength: 1,
    }),
});
//# sourceMappingURL=index.js.map