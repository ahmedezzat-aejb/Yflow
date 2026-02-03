import { Static } from '@sinclair/typebox';
export declare const AcceptInvitationRequest: import("@sinclair/typebox").TObject<{
    token: import("@sinclair/typebox").TString;
}>;
export type AcceptInvitationRequest = Static<typeof AcceptInvitationRequest>;
export declare const ListProjectMembersRequestQuery: import("@sinclair/typebox").TObject<{
    projectId: import("@sinclair/typebox").TString;
    projectRoleId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    cursor: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    limit: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TNumber>;
}>;
export type ListProjectMembersRequestQuery = Static<typeof ListProjectMembersRequestQuery>;
export declare const AcceptProjectResponse: import("@sinclair/typebox").TObject<{
    registered: import("@sinclair/typebox").TBoolean;
}>;
export type AcceptProjectResponse = Static<typeof AcceptProjectResponse>;
export declare const UpdateProjectMemberRoleRequestBody: import("@sinclair/typebox").TObject<{
    role: import("@sinclair/typebox").TString;
}>;
export type UpdateProjectMemberRoleRequestBody = Static<typeof UpdateProjectMemberRoleRequestBody>;
