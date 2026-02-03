import { Static } from '@sinclair/typebox';
export declare const ListAuditEventsRequest: import("@sinclair/typebox").TObject<{
    limit: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TNumber>;
    cursor: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    action: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>>;
    projectId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>>;
    userId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    createdBefore: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    createdAfter: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export type ListAuditEventsRequest = Static<typeof ListAuditEventsRequest>;
export declare enum ApplicationEventName {
    FLOW_CREATED = "flow.created",
    FLOW_DELETED = "flow.deleted",
    FLOW_UPDATED = "flow.updated",
    FLOW_RUN_RESUMED = "flow.run.resumed",
    FLOW_RUN_STARTED = "flow.run.started",
    FLOW_RUN_FINISHED = "flow.run.finished",
    FOLDER_CREATED = "folder.created",
    FOLDER_UPDATED = "folder.updated",
    FOLDER_DELETED = "folder.deleted",
    CONNECTION_UPSERTED = "connection.upserted",
    CONNECTION_DELETED = "connection.deleted",
    USER_SIGNED_UP = "user.signed.up",
    USER_SIGNED_IN = "user.signed.in",
    USER_PASSWORD_RESET = "user.password.reset",
    USER_EMAIL_VERIFIED = "user.email.verified",
    SIGNING_KEY_CREATED = "signing.key.created",
    PROJECT_ROLE_CREATED = "project.role.created",
    PROJECT_ROLE_DELETED = "project.role.deleted",
    PROJECT_ROLE_UPDATED = "project.role.updated",
    PROJECT_RELEASE_CREATED = "project.release.created"
}
export declare const ConnectionEvent: import("@sinclair/typebox").TObject<any>;
export type ConnectionEvent = Static<typeof ConnectionEvent>;
export declare const FolderEvent: import("@sinclair/typebox").TObject<any>;
export type FolderEvent = Static<typeof FolderEvent>;
export declare const FlowRunEvent: import("@sinclair/typebox").TObject<any>;
export type FlowRunEvent = Static<typeof FlowRunEvent>;
export declare const FlowCreatedEvent: import("@sinclair/typebox").TObject<any>;
export type FlowCreatedEvent = Static<typeof FlowCreatedEvent>;
export declare const FlowDeletedEvent: import("@sinclair/typebox").TObject<any>;
export type FlowDeletedEvent = Static<typeof FlowDeletedEvent>;
export declare const FlowUpdatedEvent: import("@sinclair/typebox").TObject<any>;
export type FlowUpdatedEvent = Static<typeof FlowUpdatedEvent>;
export declare const AuthenticationEvent: import("@sinclair/typebox").TObject<any>;
export type AuthenticationEvent = Static<typeof AuthenticationEvent>;
export declare const SignUpEvent: import("@sinclair/typebox").TObject<any>;
export type SignUpEvent = Static<typeof SignUpEvent>;
export declare const SigningKeyEvent: import("@sinclair/typebox").TObject<any>;
export type SigningKeyEvent = Static<typeof SigningKeyEvent>;
export declare const ProjectRoleEvent: import("@sinclair/typebox").TObject<any>;
export type ProjectRoleEvent = Static<typeof ProjectRoleEvent>;
export declare const ProjectReleaseEvent: import("@sinclair/typebox").TObject<any>;
export type ProjectReleaseEvent = Static<typeof ProjectReleaseEvent>;
export declare const ApplicationEvent: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TObject<any>, import("@sinclair/typebox").TObject<any>, import("@sinclair/typebox").TObject<any>, import("@sinclair/typebox").TObject<any>, import("@sinclair/typebox").TObject<any>, import("@sinclair/typebox").TObject<any>, import("@sinclair/typebox").TObject<any>, import("@sinclair/typebox").TObject<any>, import("@sinclair/typebox").TObject<any>, import("@sinclair/typebox").TObject<any>, import("@sinclair/typebox").TObject<any>]>;
export type ApplicationEvent = Static<typeof ApplicationEvent>;
export declare function summarizeApplicationEvent(event: ApplicationEvent): string | undefined;
export type ApplicationEventSummary = string;
