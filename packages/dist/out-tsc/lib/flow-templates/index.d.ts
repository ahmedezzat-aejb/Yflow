import { Static } from '@sinclair/typebox';
export declare const CreateFlowTemplateRequest: import("@sinclair/typebox").TObject<{
    description: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    template: any;
    blogUrl: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    type: import("@sinclair/typebox").TEnum<any>;
    tags: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>>;
    id: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    metadata: any;
}>;
export type CreateFlowTemplateRequest = Static<typeof CreateFlowTemplateRequest>;
