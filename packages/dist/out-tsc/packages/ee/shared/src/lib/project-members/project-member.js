import { ApId, BaseModelSchema, ProjectMetaData, ProjectRole, UserWithMetaInformation } from '@Yflow/shared';
import { Type } from '@sinclair/typebox';
export const ProjectMember = Type.Object(Object.assign(Object.assign({}, BaseModelSchema), { platformId: ApId, userId: ApId, projectId: Type.String(), projectRoleId: ApId }), {
    description: 'Project member is which user is assigned to a project.',
});
export const ProjectMemberWithUser = Type.Composite([ProjectMember, Type.Object({
        user: UserWithMetaInformation,
        projectRole: ProjectRole,
        project: ProjectMetaData,
    })]);
//# sourceMappingURL=project-member.js.map