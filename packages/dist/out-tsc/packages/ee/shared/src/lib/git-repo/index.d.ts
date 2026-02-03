import { Static } from '@sinclair/typebox';
export declare enum GitBranchType {
    PRODUCTION = "PRODUCTION",
    DEVELOPMENT = "DEVELOPMENT"
}
export declare const GitRepo: import("@sinclair/typebox").TObject<any>;
export type GitRepo = Static<typeof GitRepo>;
export declare const GitRepoWithoutSensitiveData: import("@sinclair/typebox").TObject<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export type GitRepoWithoutSensitiveData = Static<typeof GitRepoWithoutSensitiveData>;
export declare enum GitPushOperationType {
    PUSH_FLOW = "PUSH_FLOW",
    DELETE_FLOW = "DELETE_FLOW",
    PUSH_TABLE = "PUSH_TABLE",
    DELETE_TABLE = "DELETE_TABLE",
    PUSH_EVERYTHING = "PUSH_EVERYTHING"
}
export declare const PushFlowsGitRepoRequest: import("@sinclair/typebox").TObject<{
    type: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<GitPushOperationType.PUSH_FLOW>, import("@sinclair/typebox").TLiteral<GitPushOperationType.DELETE_FLOW>]>;
    commitMessage: import("@sinclair/typebox").TString;
    externalFlowIds: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>;
}>;
export type PushFlowsGitRepoRequest = Static<typeof PushFlowsGitRepoRequest>;
export declare const PushTablesGitRepoRequest: import("@sinclair/typebox").TObject<{
    type: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<GitPushOperationType.PUSH_TABLE>, import("@sinclair/typebox").TLiteral<GitPushOperationType.DELETE_TABLE>]>;
    commitMessage: import("@sinclair/typebox").TString;
    externalTableIds: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>;
}>;
export type PushTablesGitRepoRequest = Static<typeof PushTablesGitRepoRequest>;
export declare const PushEverythingGitRepoRequest: import("@sinclair/typebox").TObject<{
    type: import("@sinclair/typebox").TLiteral<GitPushOperationType.PUSH_EVERYTHING>;
    commitMessage: import("@sinclair/typebox").TString;
}>;
export type PushEverythingGitRepoRequest = Static<typeof PushEverythingGitRepoRequest>;
export declare const PushGitRepoRequest: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TObject<{
    type: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<GitPushOperationType.PUSH_FLOW>, import("@sinclair/typebox").TLiteral<GitPushOperationType.DELETE_FLOW>]>;
    commitMessage: import("@sinclair/typebox").TString;
    externalFlowIds: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>;
}>, import("@sinclair/typebox").TObject<{
    type: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<GitPushOperationType.PUSH_TABLE>, import("@sinclair/typebox").TLiteral<GitPushOperationType.DELETE_TABLE>]>;
    commitMessage: import("@sinclair/typebox").TString;
    externalTableIds: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>;
}>, import("@sinclair/typebox").TObject<{
    type: import("@sinclair/typebox").TLiteral<GitPushOperationType.PUSH_EVERYTHING>;
    commitMessage: import("@sinclair/typebox").TString;
}>]>;
export type PushGitRepoRequest = Static<typeof PushGitRepoRequest>;
export declare const ConfigureRepoRequest: import("@sinclair/typebox").TObject<{
    projectId: import("@sinclair/typebox").TString;
    remoteUrl: import("@sinclair/typebox").TString;
    branch: import("@sinclair/typebox").TString;
    branchType: import("@sinclair/typebox").TEnum<typeof GitBranchType>;
    sshPrivateKey: import("@sinclair/typebox").TString;
    slug: import("@sinclair/typebox").TString;
}>;
export type ConfigureRepoRequest = Static<typeof ConfigureRepoRequest>;
