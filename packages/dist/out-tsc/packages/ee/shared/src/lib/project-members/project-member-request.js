import { Type } from '@sinclair/typebox';
export const AcceptInvitationRequest = Type.Object({
    token: Type.String(),
});
export const ListProjectMembersRequestQuery = Type.Object({
    projectId: Type.String(),
    projectRoleId: Type.Optional(Type.String()),
    cursor: Type.Optional(Type.String()),
    limit: Type.Optional(Type.Number()),
});
export const AcceptProjectResponse = Type.Object({
    registered: Type.Boolean(),
});
export const UpdateProjectMemberRoleRequestBody = Type.Object({
    role: Type.String(),
});
//# sourceMappingURL=project-member-request.js.map