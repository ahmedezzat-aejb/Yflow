import { AppConnectionWithoutSensitiveData, BaseModelSchema, Flow, FlowOperationRequest, FlowOperationType, FlowRun, FlowVersion, Folder, Project, ProjectRelease, ProjectRole, User, } from '@Yflow/shared';
import { Type } from '@sinclair/typebox';
import { SigningKey } from '../signing-key';
export const ListAuditEventsRequest = Type.Object({
    limit: Type.Optional(Type.Number()),
    cursor: Type.Optional(Type.String()),
    action: Type.Optional(Type.Array(Type.String())),
    projectId: Type.Optional(Type.Array(Type.String())),
    userId: Type.Optional(Type.String()),
    createdBefore: Type.Optional(Type.String()),
    createdAfter: Type.Optional(Type.String()),
});
const UserMeta = Type.Pick(User, ['email', 'id', 'firstName', 'lastName']);
export var ApplicationEventName;
(function (ApplicationEventName) {
    ApplicationEventName["FLOW_CREATED"] = "flow.created";
    ApplicationEventName["FLOW_DELETED"] = "flow.deleted";
    ApplicationEventName["FLOW_UPDATED"] = "flow.updated";
    ApplicationEventName["FLOW_RUN_RESUMED"] = "flow.run.resumed";
    ApplicationEventName["FLOW_RUN_STARTED"] = "flow.run.started";
    ApplicationEventName["FLOW_RUN_FINISHED"] = "flow.run.finished";
    ApplicationEventName["FOLDER_CREATED"] = "folder.created";
    ApplicationEventName["FOLDER_UPDATED"] = "folder.updated";
    ApplicationEventName["FOLDER_DELETED"] = "folder.deleted";
    ApplicationEventName["CONNECTION_UPSERTED"] = "connection.upserted";
    ApplicationEventName["CONNECTION_DELETED"] = "connection.deleted";
    ApplicationEventName["USER_SIGNED_UP"] = "user.signed.up";
    ApplicationEventName["USER_SIGNED_IN"] = "user.signed.in";
    ApplicationEventName["USER_PASSWORD_RESET"] = "user.password.reset";
    ApplicationEventName["USER_EMAIL_VERIFIED"] = "user.email.verified";
    ApplicationEventName["SIGNING_KEY_CREATED"] = "signing.key.created";
    ApplicationEventName["PROJECT_ROLE_CREATED"] = "project.role.created";
    ApplicationEventName["PROJECT_ROLE_DELETED"] = "project.role.deleted";
    ApplicationEventName["PROJECT_ROLE_UPDATED"] = "project.role.updated";
    ApplicationEventName["PROJECT_RELEASE_CREATED"] = "project.release.created";
})(ApplicationEventName || (ApplicationEventName = {}));
const BaseAuditEventProps = Object.assign(Object.assign({}, BaseModelSchema), { platformId: Type.String(), projectId: Type.Optional(Type.String()), projectDisplayName: Type.Optional(Type.String()), userId: Type.Optional(Type.String()), userEmail: Type.Optional(Type.String()), ip: Type.Optional(Type.String()) });
export const ConnectionEvent = Type.Object(Object.assign(Object.assign({}, BaseAuditEventProps), { action: Type.Union([
        Type.Literal(ApplicationEventName.CONNECTION_DELETED),
        Type.Literal(ApplicationEventName.CONNECTION_UPSERTED),
    ]), data: Type.Object({
        connection: Type.Pick(AppConnectionWithoutSensitiveData, [
            'displayName',
            'externalId',
            'pieceName',
            'status',
            'type',
            'id',
            'created',
            'updated',
        ]),
        project: Type.Optional(Type.Pick(Project, ['displayName'])),
    }) }));
export const FolderEvent = Type.Object(Object.assign(Object.assign({}, BaseAuditEventProps), { action: Type.Union([
        Type.Literal(ApplicationEventName.FOLDER_UPDATED),
        Type.Literal(ApplicationEventName.FOLDER_CREATED),
        Type.Literal(ApplicationEventName.FOLDER_DELETED),
    ]), data: Type.Object({
        folder: Type.Pick(Folder, ['id', 'displayName', 'created', 'updated']),
        project: Type.Optional(Type.Pick(Project, ['displayName'])),
    }) }));
export const FlowRunEvent = Type.Object(Object.assign(Object.assign({}, BaseAuditEventProps), { action: Type.Union([
        Type.Literal(ApplicationEventName.FLOW_RUN_STARTED),
        Type.Literal(ApplicationEventName.FLOW_RUN_FINISHED),
        Type.Literal(ApplicationEventName.FLOW_RUN_RESUMED),
    ]), data: Type.Object({
        flowRun: Type.Pick(FlowRun, [
            'id',
            'startTime',
            'finishTime',
            'duration',
            'environment',
            'flowId',
            'flowVersionId',
            'flowDisplayName',
            'status',
        ]),
        project: Type.Optional(Type.Pick(Project, ['displayName'])),
    }) }));
export const FlowCreatedEvent = Type.Object(Object.assign(Object.assign({}, BaseAuditEventProps), { action: Type.Literal(ApplicationEventName.FLOW_CREATED), data: Type.Object({
        flow: Type.Pick(Flow, ['id', 'created', 'updated']),
        project: Type.Optional(Type.Pick(Project, ['displayName'])),
    }) }));
export const FlowDeletedEvent = Type.Object(Object.assign(Object.assign({}, BaseAuditEventProps), { action: Type.Literal(ApplicationEventName.FLOW_DELETED), data: Type.Object({
        flow: Type.Pick(Flow, ['id', 'created', 'updated']),
        flowVersion: Type.Pick(FlowVersion, [
            'id',
            'displayName',
            'flowId',
            'created',
            'updated',
        ]),
        project: Type.Optional(Type.Pick(Project, ['displayName'])),
    }) }));
export const FlowUpdatedEvent = Type.Object(Object.assign(Object.assign({}, BaseAuditEventProps), { action: Type.Literal(ApplicationEventName.FLOW_UPDATED), data: Type.Object({
        flowVersion: Type.Pick(FlowVersion, [
            'id',
            'displayName',
            'flowId',
            'created',
            'updated',
        ]),
        request: FlowOperationRequest,
        project: Type.Optional(Type.Pick(Project, ['displayName'])),
    }) }));
export const AuthenticationEvent = Type.Object(Object.assign(Object.assign({}, BaseAuditEventProps), { action: Type.Union([
        Type.Literal(ApplicationEventName.USER_SIGNED_IN),
        Type.Literal(ApplicationEventName.USER_PASSWORD_RESET),
        Type.Literal(ApplicationEventName.USER_EMAIL_VERIFIED),
    ]), data: Type.Object({
        user: Type.Optional(UserMeta),
    }) }));
export const SignUpEvent = Type.Object(Object.assign(Object.assign({}, BaseAuditEventProps), { action: Type.Literal(ApplicationEventName.USER_SIGNED_UP), data: Type.Object({
        source: Type.Union([
            Type.Literal('credentials'),
            Type.Literal('sso'),
            Type.Literal('managed'),
        ]),
        user: Type.Optional(UserMeta),
    }) }));
export const SigningKeyEvent = Type.Object(Object.assign(Object.assign({}, BaseAuditEventProps), { action: Type.Union([Type.Literal(ApplicationEventName.SIGNING_KEY_CREATED)]), data: Type.Object({
        signingKey: Type.Pick(SigningKey, [
            'id',
            'created',
            'updated',
            'displayName',
        ]),
    }) }));
export const ProjectRoleEvent = Type.Object(Object.assign(Object.assign({}, BaseAuditEventProps), { action: Type.Union([
        Type.Literal(ApplicationEventName.PROJECT_ROLE_CREATED),
        Type.Literal(ApplicationEventName.PROJECT_ROLE_UPDATED),
        Type.Literal(ApplicationEventName.PROJECT_ROLE_DELETED),
    ]), data: Type.Object({
        projectRole: Type.Pick(ProjectRole, [
            'id',
            'created',
            'updated',
            'name',
            'permissions',
            'platformId',
        ]),
    }) }));
export const ProjectReleaseEvent = Type.Object(Object.assign(Object.assign({}, BaseAuditEventProps), { action: Type.Literal(ApplicationEventName.PROJECT_RELEASE_CREATED), data: Type.Object({
        release: Type.Pick(ProjectRelease, ['name', 'description', 'type', 'projectId', 'importedByUser']),
    }) }));
export const ApplicationEvent = Type.Union([
    ConnectionEvent,
    FlowCreatedEvent,
    FlowDeletedEvent,
    FlowUpdatedEvent,
    FlowRunEvent,
    AuthenticationEvent,
    FolderEvent,
    SignUpEvent,
    SigningKeyEvent,
    ProjectRoleEvent,
    ProjectReleaseEvent,
]);
export function summarizeApplicationEvent(event) {
    switch (event['action']) {
        case ApplicationEventName.FLOW_UPDATED: {
            return convertUpdateActionToDetails(event);
        }
        case ApplicationEventName.FLOW_RUN_STARTED:
            return `Flow run ${event['data'].flowRun.id} is started`;
        case ApplicationEventName.FLOW_RUN_FINISHED: {
            return `Flow run ${event['data'].flowRun.id} is finished`;
        }
        case ApplicationEventName.FLOW_RUN_RESUMED: {
            return `Flow run ${event['data'].flowRun.id} is resumed`;
        }
        case ApplicationEventName.FLOW_CREATED:
            return `Flow ${event['data'].flow.id} is created`;
        case ApplicationEventName.FLOW_DELETED:
            return `Flow ${event['data'].flow.id} (${event['data'].flowVersion.displayName}) is deleted`;
        case ApplicationEventName.FOLDER_CREATED:
            return `${event['data'].folder.displayName} is created`;
        case ApplicationEventName.FOLDER_UPDATED:
            return `${event['data'].folder.displayName} is updated`;
        case ApplicationEventName.FOLDER_DELETED:
            return `${event['data'].folder.displayName} is deleted`;
        case ApplicationEventName.CONNECTION_UPSERTED:
            return `${event['data'].connection.displayName} (${event['data'].connection.externalId}) is updated`;
        case ApplicationEventName.CONNECTION_DELETED:
            return `${event['data'].connection.displayName} (${event['data'].connection.externalId}) is deleted`;
        case ApplicationEventName.USER_SIGNED_IN:
            return `User ${event['userEmail']} signed in`;
        case ApplicationEventName.USER_PASSWORD_RESET:
            return `User ${event['userEmail']} reset password`;
        case ApplicationEventName.USER_EMAIL_VERIFIED:
            return `User ${event['userEmail']} verified email`;
        case ApplicationEventName.USER_SIGNED_UP:
            return `User ${event['userEmail']} signed up using email from ${event['data'].source}`;
        case ApplicationEventName.SIGNING_KEY_CREATED:
            return `${event['data'].signingKey.displayName} is created`;
        case ApplicationEventName.PROJECT_ROLE_CREATED:
            return `${event['data'].projectRole.name} is created`;
        case ApplicationEventName.PROJECT_ROLE_UPDATED:
            return `${event['data'].projectRole.name} is updated`;
        case ApplicationEventName.PROJECT_ROLE_DELETED:
            return `${event['data'].projectRole.name} is deleted`;
        case ApplicationEventName.PROJECT_RELEASE_CREATED:
            return `${event['data'].release.name} is created`;
    }
}
function convertUpdateActionToDetails(event) {
    switch (event['data'].request.type) {
        case FlowOperationType.ADD_ACTION:
            return `Added action "${event['data'].request.request.action.displayName}" to "${event['data'].flowVersion.displayName}" Flow.`;
        case FlowOperationType.UPDATE_ACTION:
            return `Updated action "${event['data'].request.request.displayName}" in "${event['data'].flowVersion.displayName}" Flow.`;
        case FlowOperationType.DELETE_ACTION:
            {
                const request = event['data'].request.request;
                const names = request.names;
                return `Deleted actions "${names.join(', ')}" from "${event['data'].flowVersion.displayName}" Flow.`;
            }
        case FlowOperationType.CHANGE_NAME:
            return `Renamed flow "${event['data'].flowVersion.displayName}" to "${event['data'].request.request.displayName}".`;
        case FlowOperationType.LOCK_AND_PUBLISH:
            return `Locked and published flow "${event['data'].flowVersion.displayName}" Flow.`;
        case FlowOperationType.USE_AS_DRAFT:
            return `Unlocked and unpublished flow "${event['data'].flowVersion.displayName}" Flow.`;
        case FlowOperationType.MOVE_ACTION:
            return `Moved action "${event['data'].request.request.name}" to after "${event['data'].request.request.newParentStep}".`;
        case FlowOperationType.LOCK_FLOW:
            return `Locked flow "${event['data'].flowVersion.displayName}" Flow.`;
        case FlowOperationType.CHANGE_STATUS:
            return `Changed status of flow "${event['data'].flowVersion.displayName}" Flow to "${event['data'].request.request.status}".`;
        case FlowOperationType.DUPLICATE_ACTION:
            return `Duplicated action "${event['data'].request.request.stepName}" in "${event['data'].flowVersion.displayName}" Flow.`;
        case FlowOperationType.IMPORT_FLOW:
            return `Imported flow in "${event['data'].request.request.displayName}" Flow.`;
        case FlowOperationType.UPDATE_TRIGGER:
            return `Updated trigger in "${event['data'].flowVersion.displayName}" Flow to "${event['data'].request.request.displayName}".`;
        case FlowOperationType.CHANGE_FOLDER:
            return `Moved flow "${event['data'].flowVersion.displayName}" to folder id ${event['data'].request.request.folderId}.`;
        case FlowOperationType.DELETE_BRANCH: {
            return `Deleted branch number ${event['data'].request.request.branchIndex + 1} in flow "${event['data'].flowVersion.displayName}" for the step "${event['data'].request.request.stepName}".`;
        }
        case FlowOperationType.SAVE_SAMPLE_DATA: {
            return `Saved sample data for step "${event['data'].request.request.stepName}" in flow "${event['data'].flowVersion.displayName}".`;
        }
        case FlowOperationType.DUPLICATE_BRANCH: {
            return `Duplicated branch number ${event['data'].request.request.branchIndex + 1} in flow "${event['data'].flowVersion.displayName}" for the step "${event['data'].request.request.stepName}".`;
        }
        case FlowOperationType.ADD_BRANCH:
            return `Added branch number ${event['data'].request.request.branchIndex + 1} in flow "${event['data'].flowVersion.displayName}" for the step "${event['data'].request.request.stepName}".`;
        case FlowOperationType.SET_SKIP_ACTION:
            {
                const request = event['data'].request.request;
                const names = request.names;
                return `Updated actions "${names.join(', ')}" in "${event['data'].flowVersion.displayName}" Flow to skip.`;
            }
        case FlowOperationType.UPDATE_METADATA:
            return `Updated metadata for flow "${event['data'].flowVersion.displayName}".`;
        case FlowOperationType.MOVE_BRANCH:
            return `Moved branch number ${event['data'].request.request.sourceBranchIndex + 1} to ${event['data'].request.request.targetBranchIndex + 1} in flow "${event['data'].flowVersion.displayName}" for the step "${event['data'].request.request.stepName}".`;
    }
}
//# sourceMappingURL=index.js.map