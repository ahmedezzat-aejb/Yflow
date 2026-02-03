import { Static } from '@sinclair/typebox';
export declare enum CustomDomainStatus {
    ACTIVE = "ACTIVE",
    PENDING = "PENDING"
}
export declare const CustomDomain: import("@sinclair/typebox").TObject<any>;
export type CustomDomain = Static<typeof CustomDomain>;
export declare const AddDomainRequest: import("@sinclair/typebox").TObject<{
    domain: import("@sinclair/typebox").TString;
}>;
export type AddDomainRequest = Static<typeof AddDomainRequest>;
export declare const ListCustomDomainsRequest: import("@sinclair/typebox").TObject<{
    limit: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TNumber>;
    cursor: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export type ListCustomDomainsRequest = Static<typeof ListCustomDomainsRequest>;
