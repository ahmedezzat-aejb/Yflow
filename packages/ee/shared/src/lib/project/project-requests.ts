
import { Static, Type, TSchema } from '@sinclair/typebox'

export const ApId = Type.String();
export const ProjectIcon = Type.Any();
export enum PiecesFilterType { NONE = 'NONE' }
export enum ProjectType { PLATFORM = 'PLATFORM' }

export const SAFE_STRING_PATTERN = '^[a-zA-Z0-9_-]*$';

export const Nullable = <T extends TSchema>(type: T) => Type.Union([type, Type.Null()]);

// تعريف الـ Plan بحيث يحتوي على قائمة الـ Pieces
export const ProjectPlan = Type.Object({
    pieces: Type.Optional(Type.Array(Type.String())),
    piecesFilterType: Type.Optional(Type.Enum(PiecesFilterType)),
})

export type ProjectPlan = Static<typeof ProjectPlan>

// تحديث الـ Request عشان السيرفر يقبل الـ Plan الجديدة
export const UpdateProjectPlatformRequest = Type.Object({
    releasesEnabled: Type.Optional(Type.Boolean()),
    displayName: Type.Optional(Type.String({ pattern: SAFE_STRING_PATTERN })),
    externalId: Type.Optional(Type.String()),
    icon: Type.Optional(ProjectIcon),
    plan: Type.Optional(ProjectPlan), // هنا السيرفر هيفتح الباب للـ Plan
})

export type UpdateProjectPlatformRequest = Static<typeof UpdateProjectPlatformRequest>

export const CreatePlatformProjectRequest = Type.Object({
    displayName: Type.String({ pattern: SAFE_STRING_PATTERN }),
    externalId: Type.Optional(Type.String()),
    maxConcurrentJobs: Type.Optional(Type.Number()),
})

export type CreatePlatformProjectRequest = Static<typeof CreatePlatformProjectRequest>
export * from './project-requests';
