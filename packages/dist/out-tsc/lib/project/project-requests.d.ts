import { Static } from '@sinclair/typebox';
export declare const UpdateProjectPlatformRequest: import("@sinclair/typebox").TObject<{
    releasesEnabled: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    displayName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    externalId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    metadata: import("@sinclair/typebox").TOptionalFromMappedResult<any, true>;
    icon: import("@sinclair/typebox").TOptionalFromMappedResult<any, true>;
    plan: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TObject<{
        pieces: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>>;
        piecesFilterType: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TEnum<any>>;
    }>>;
}>;
export type UpdateProjectPlatformRequest = Static<typeof UpdateProjectPlatformRequest>;
export declare const CreatePlatformProjectRequest: import("@sinclair/typebox").TObject<{
    displayName: import("@sinclair/typebox").TString;
    externalId: any;
    metadata: any;
    maxConcurrentJobs: any;
}>;
export type CreatePlatformProjectRequest = Static<typeof CreatePlatformProjectRequest>;
export declare const ListProjectRequestForPlatformQueryParams: import("@sinclair/typebox").TObject<{
    externalId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    limit: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TNumber>;
    cursor: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    displayName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    types: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TEnum<any>>>;
}>;
export type ListProjectRequestForPlatformQueryParams = Static<typeof ListProjectRequestForPlatformQueryParams>;
