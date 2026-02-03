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
exports.ApplicationEvent = exports.ProjectReleaseEvent = exports.ProjectRoleEvent = exports.SigningKeyEvent = exports.SignUpEvent = exports.AuthenticationEvent = exports.FlowUpdatedEvent = exports.FlowDeletedEvent = exports.FlowCreatedEvent = exports.FlowRunEvent = exports.FolderEvent = exports.ConnectionEvent = exports.ApplicationEventName = exports.ListAuditEventsRequest = void 0;
exports.summarizeApplicationEvent = summarizeApplicationEvent;
var shared_1 = require("@Yflow/shared");
var typebox_1 = require("@sinclair/typebox");
var signing_key_1 = require("../signing-key");
exports.ListAuditEventsRequest = typebox_1.Type.Object({
    limit: typebox_1.Type.Optional(typebox_1.Type.Number()),
    cursor: typebox_1.Type.Optional(typebox_1.Type.String()),
    action: typebox_1.Type.Optional(typebox_1.Type.Array(typebox_1.Type.String())),
    projectId: typebox_1.Type.Optional(typebox_1.Type.Array(typebox_1.Type.String())),
    userId: typebox_1.Type.Optional(typebox_1.Type.String()),
    createdBefore: typebox_1.Type.Optional(typebox_1.Type.String()),
    createdAfter: typebox_1.Type.Optional(typebox_1.Type.String()),
});
var UserMeta = typebox_1.Type.Pick(shared_1.User, ['email', 'id', 'firstName', 'lastName']);
var ApplicationEventName;
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
})(ApplicationEventName || (exports.ApplicationEventName = ApplicationEventName = {}));
var BaseAuditEventProps = __assign(__assign({}, shared_1.BaseModelSchema), { platformId: typebox_1.Type.String(), projectId: typebox_1.Type.Optional(typebox_1.Type.String()), projectDisplayName: typebox_1.Type.Optional(typebox_1.Type.String()), userId: typebox_1.Type.Optional(typebox_1.Type.String()), userEmail: typebox_1.Type.Optional(typebox_1.Type.String()), ip: typebox_1.Type.Optional(typebox_1.Type.String()) });
exports.ConnectionEvent = typebox_1.Type.Object(__assign(__assign({}, BaseAuditEventProps), { action: typebox_1.Type.Union([
        typebox_1.Type.Literal(ApplicationEventName.CONNECTION_DELETED),
        typebox_1.Type.Literal(ApplicationEventName.CONNECTION_UPSERTED),
    ]), data: typebox_1.Type.Object({
        connection: typebox_1.Type.Pick(shared_1.AppConnectionWithoutSensitiveData, [
            'displayName',
            'externalId',
            'pieceName',
            'status',
            'type',
            'id',
            'created',
            'updated',
        ]),
        project: typebox_1.Type.Optional(typebox_1.Type.Pick(shared_1.Project, ['displayName'])),
    }) }));
exports.FolderEvent = typebox_1.Type.Object(__assign(__assign({}, BaseAuditEventProps), { action: typebox_1.Type.Union([
        typebox_1.Type.Literal(ApplicationEventName.FOLDER_UPDATED),
        typebox_1.Type.Literal(ApplicationEventName.FOLDER_CREATED),
        typebox_1.Type.Literal(ApplicationEventName.FOLDER_DELETED),
    ]), data: typebox_1.Type.Object({
        folder: typebox_1.Type.Pick(shared_1.Folder, ['id', 'displayName', 'created', 'updated']),
        project: typebox_1.Type.Optional(typebox_1.Type.Pick(shared_1.Project, ['displayName'])),
    }) }));
exports.FlowRunEvent = typebox_1.Type.Object(__assign(__assign({}, BaseAuditEventProps), { action: typebox_1.Type.Union([
        typebox_1.Type.Literal(ApplicationEventName.FLOW_RUN_STARTED),
        typebox_1.Type.Literal(ApplicationEventName.FLOW_RUN_FINISHED),
        typebox_1.Type.Literal(ApplicationEventName.FLOW_RUN_RESUMED),
    ]), data: typebox_1.Type.Object({
        flowRun: typebox_1.Type.Pick(shared_1.FlowRun, [
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
        project: typebox_1.Type.Optional(typebox_1.Type.Pick(shared_1.Project, ['displayName'])),
    }) }));
exports.FlowCreatedEvent = typebox_1.Type.Object(__assign(__assign({}, BaseAuditEventProps), { action: typebox_1.Type.Literal(ApplicationEventName.FLOW_CREATED), data: typebox_1.Type.Object({
        flow: typebox_1.Type.Pick(shared_1.Flow, ['id', 'created', 'updated']),
        project: typebox_1.Type.Optional(typebox_1.Type.Pick(shared_1.Project, ['displayName'])),
    }) }));
exports.FlowDeletedEvent = typebox_1.Type.Object(__assign(__assign({}, BaseAuditEventProps), { action: typebox_1.Type.Literal(ApplicationEventName.FLOW_DELETED), data: typebox_1.Type.Object({
        flow: typebox_1.Type.Pick(shared_1.Flow, ['id', 'created', 'updated']),
        flowVersion: typebox_1.Type.Pick(shared_1.FlowVersion, [
            'id',
            'displayName',
            'flowId',
            'created',
            'updated',
        ]),
        project: typebox_1.Type.Optional(typebox_1.Type.Pick(shared_1.Project, ['displayName'])),
    }) }));
exports.FlowUpdatedEvent = typebox_1.Type.Object(__assign(__assign({}, BaseAuditEventProps), { action: typebox_1.Type.Literal(ApplicationEventName.FLOW_UPDATED), data: typebox_1.Type.Object({
        flowVersion: typebox_1.Type.Pick(shared_1.FlowVersion, [
            'id',
            'displayName',
            'flowId',
            'created',
            'updated',
        ]),
        request: shared_1.FlowOperationRequest,
        project: typebox_1.Type.Optional(typebox_1.Type.Pick(shared_1.Project, ['displayName'])),
    }) }));
exports.AuthenticationEvent = typebox_1.Type.Object(__assign(__assign({}, BaseAuditEventProps), { action: typebox_1.Type.Union([
        typebox_1.Type.Literal(ApplicationEventName.USER_SIGNED_IN),
        typebox_1.Type.Literal(ApplicationEventName.USER_PASSWORD_RESET),
        typebox_1.Type.Literal(ApplicationEventName.USER_EMAIL_VERIFIED),
    ]), data: typebox_1.Type.Object({
        user: typebox_1.Type.Optional(UserMeta),
    }) }));
exports.SignUpEvent = typebox_1.Type.Object(__assign(__assign({}, BaseAuditEventProps), { action: typebox_1.Type.Literal(ApplicationEventName.USER_SIGNED_UP), data: typebox_1.Type.Object({
        source: typebox_1.Type.Union([
            typebox_1.Type.Literal('credentials'),
            typebox_1.Type.Literal('sso'),
            typebox_1.Type.Literal('managed'),
        ]),
        user: typebox_1.Type.Optional(UserMeta),
    }) }));
exports.SigningKeyEvent = typebox_1.Type.Object(__assign(__assign({}, BaseAuditEventProps), { action: typebox_1.Type.Union([typebox_1.Type.Literal(ApplicationEventName.SIGNING_KEY_CREATED)]), data: typebox_1.Type.Object({
        signingKey: typebox_1.Type.Pick(signing_key_1.SigningKey, [
            'id',
            'created',
            'updated',
            'displayName',
        ]),
    }) }));
exports.ProjectRoleEvent = typebox_1.Type.Object(__assign(__assign({}, BaseAuditEventProps), { action: typebox_1.Type.Union([
        typebox_1.Type.Literal(ApplicationEventName.PROJECT_ROLE_CREATED),
        typebox_1.Type.Literal(ApplicationEventName.PROJECT_ROLE_UPDATED),
        typebox_1.Type.Literal(ApplicationEventName.PROJECT_ROLE_DELETED),
    ]), data: typebox_1.Type.Object({
        projectRole: typebox_1.Type.Pick(shared_1.ProjectRole, [
            'id',
            'created',
            'updated',
            'name',
            'permissions',
            'platformId',
        ]),
    }) }));
exports.ProjectReleaseEvent = typebox_1.Type.Object(__assign(__assign({}, BaseAuditEventProps), { action: typebox_1.Type.Literal(ApplicationEventName.PROJECT_RELEASE_CREATED), data: typebox_1.Type.Object({
        release: typebox_1.Type.Pick(shared_1.ProjectRelease, ['name', 'description', 'type', 'projectId', 'importedByUser']),
    }) }));
exports.ApplicationEvent = typebox_1.Type.Union([
    exports.ConnectionEvent,
    exports.FlowCreatedEvent,
    exports.FlowDeletedEvent,
    exports.FlowUpdatedEvent,
    exports.FlowRunEvent,
    exports.AuthenticationEvent,
    exports.FolderEvent,
    exports.SignUpEvent,
    exports.SigningKeyEvent,
    exports.ProjectRoleEvent,
    exports.ProjectReleaseEvent,
]);
function summarizeApplicationEvent(event) {
    switch (event['action']) {
        case ApplicationEventName.FLOW_UPDATED: {
            return convertUpdateActionToDetails(event);
        }
        case ApplicationEventName.FLOW_RUN_STARTED:
            return "Flow run ".concat(event['data'].flowRun.id, " is started");
        case ApplicationEventName.FLOW_RUN_FINISHED: {
            return "Flow run ".concat(event['data'].flowRun.id, " is finished");
        }
        case ApplicationEventName.FLOW_RUN_RESUMED: {
            return "Flow run ".concat(event['data'].flowRun.id, " is resumed");
        }
        case ApplicationEventName.FLOW_CREATED:
            return "Flow ".concat(event['data'].flow.id, " is created");
        case ApplicationEventName.FLOW_DELETED:
            return "Flow ".concat(event['data'].flow.id, " (").concat(event['data'].flowVersion.displayName, ") is deleted");
        case ApplicationEventName.FOLDER_CREATED:
            return "".concat(event['data'].folder.displayName, " is created");
        case ApplicationEventName.FOLDER_UPDATED:
            return "".concat(event['data'].folder.displayName, " is updated");
        case ApplicationEventName.FOLDER_DELETED:
            return "".concat(event['data'].folder.displayName, " is deleted");
        case ApplicationEventName.CONNECTION_UPSERTED:
            return "".concat(event['data'].connection.displayName, " (").concat(event['data'].connection.externalId, ") is updated");
        case ApplicationEventName.CONNECTION_DELETED:
            return "".concat(event['data'].connection.displayName, " (").concat(event['data'].connection.externalId, ") is deleted");
        case ApplicationEventName.USER_SIGNED_IN:
            return "User ".concat(event['userEmail'], " signed in");
        case ApplicationEventName.USER_PASSWORD_RESET:
            return "User ".concat(event['userEmail'], " reset password");
        case ApplicationEventName.USER_EMAIL_VERIFIED:
            return "User ".concat(event['userEmail'], " verified email");
        case ApplicationEventName.USER_SIGNED_UP:
            return "User ".concat(event['userEmail'], " signed up using email from ").concat(event['data'].source);
        case ApplicationEventName.SIGNING_KEY_CREATED:
            return "".concat(event['data'].signingKey.displayName, " is created");
        case ApplicationEventName.PROJECT_ROLE_CREATED:
            return "".concat(event['data'].projectRole.name, " is created");
        case ApplicationEventName.PROJECT_ROLE_UPDATED:
            return "".concat(event['data'].projectRole.name, " is updated");
        case ApplicationEventName.PROJECT_ROLE_DELETED:
            return "".concat(event['data'].projectRole.name, " is deleted");
        case ApplicationEventName.PROJECT_RELEASE_CREATED:
            return "".concat(event['data'].release.name, " is created");
    }
}
function convertUpdateActionToDetails(event) {
    switch (event['data'].request.type) {
        case shared_1.FlowOperationType.ADD_ACTION:
            return "Added action \"".concat(event['data'].request.request.action.displayName, "\" to \"").concat(event['data'].flowVersion.displayName, "\" Flow.");
        case shared_1.FlowOperationType.UPDATE_ACTION:
            return "Updated action \"".concat(event['data'].request.request.displayName, "\" in \"").concat(event['data'].flowVersion.displayName, "\" Flow.");
        case shared_1.FlowOperationType.DELETE_ACTION:
            {
                var request = event['data'].request.request;
                var names = request.names;
                return "Deleted actions \"".concat(names.join(', '), "\" from \"").concat(event['data'].flowVersion.displayName, "\" Flow.");
            }
        case shared_1.FlowOperationType.CHANGE_NAME:
            return "Renamed flow \"".concat(event['data'].flowVersion.displayName, "\" to \"").concat(event['data'].request.request.displayName, "\".");
        case shared_1.FlowOperationType.LOCK_AND_PUBLISH:
            return "Locked and published flow \"".concat(event['data'].flowVersion.displayName, "\" Flow.");
        case shared_1.FlowOperationType.USE_AS_DRAFT:
            return "Unlocked and unpublished flow \"".concat(event['data'].flowVersion.displayName, "\" Flow.");
        case shared_1.FlowOperationType.MOVE_ACTION:
            return "Moved action \"".concat(event['data'].request.request.name, "\" to after \"").concat(event['data'].request.request.newParentStep, "\".");
        case shared_1.FlowOperationType.LOCK_FLOW:
            return "Locked flow \"".concat(event['data'].flowVersion.displayName, "\" Flow.");
        case shared_1.FlowOperationType.CHANGE_STATUS:
            return "Changed status of flow \"".concat(event['data'].flowVersion.displayName, "\" Flow to \"").concat(event['data'].request.request.status, "\".");
        case shared_1.FlowOperationType.DUPLICATE_ACTION:
            return "Duplicated action \"".concat(event['data'].request.request.stepName, "\" in \"").concat(event['data'].flowVersion.displayName, "\" Flow.");
        case shared_1.FlowOperationType.IMPORT_FLOW:
            return "Imported flow in \"".concat(event['data'].request.request.displayName, "\" Flow.");
        case shared_1.FlowOperationType.UPDATE_TRIGGER:
            return "Updated trigger in \"".concat(event['data'].flowVersion.displayName, "\" Flow to \"").concat(event['data'].request.request.displayName, "\".");
        case shared_1.FlowOperationType.CHANGE_FOLDER:
            return "Moved flow \"".concat(event['data'].flowVersion.displayName, "\" to folder id ").concat(event['data'].request.request.folderId, ".");
        case shared_1.FlowOperationType.DELETE_BRANCH: {
            return "Deleted branch number ".concat(event['data'].request.request.branchIndex + 1, " in flow \"").concat(event['data'].flowVersion.displayName, "\" for the step \"").concat(event['data'].request.request.stepName, "\".");
        }
        case shared_1.FlowOperationType.SAVE_SAMPLE_DATA: {
            return "Saved sample data for step \"".concat(event['data'].request.request.stepName, "\" in flow \"").concat(event['data'].flowVersion.displayName, "\".");
        }
        case shared_1.FlowOperationType.DUPLICATE_BRANCH: {
            return "Duplicated branch number ".concat(event['data'].request.request.branchIndex + 1, " in flow \"").concat(event['data'].flowVersion.displayName, "\" for the step \"").concat(event['data'].request.request.stepName, "\".");
        }
        case shared_1.FlowOperationType.ADD_BRANCH:
            return "Added branch number ".concat(event['data'].request.request.branchIndex + 1, " in flow \"").concat(event['data'].flowVersion.displayName, "\" for the step \"").concat(event['data'].request.request.stepName, "\".");
        case shared_1.FlowOperationType.SET_SKIP_ACTION:
            {
                var request = event['data'].request.request;
                var names = request.names;
                return "Updated actions \"".concat(names.join(', '), "\" in \"").concat(event['data'].flowVersion.displayName, "\" Flow to skip.");
            }
        case shared_1.FlowOperationType.UPDATE_METADATA:
            return "Updated metadata for flow \"".concat(event['data'].flowVersion.displayName, "\".");
        case shared_1.FlowOperationType.MOVE_BRANCH:
            return "Moved branch number ".concat(event['data'].request.request.sourceBranchIndex + 1, " to ").concat(event['data'].request.request.targetBranchIndex + 1, " in flow \"").concat(event['data'].flowVersion.displayName, "\" for the step \"").concat(event['data'].request.request.stepName, "\".");
    }
}
