import { PiecesFilterType, PlanName, PlatformPlanWithOnlyLimits } from '@Yflow/shared';
import { Static } from '@sinclair/typebox';
export declare const PRICE_PER_EXTRA_ACTIVE_FLOWS = 5;
export declare const AI_CREDITS_USAGE_THRESHOLD = 15000;
export declare enum SBERBANK_PLANS {
    PRO = "PRO_RUB",
    ENTERPRISE = "ENTERPRISE_RUB"
}
export declare const SBERBANK_PRICES: {
    PRO_RUB: number;
    ENTERPRISE_RUB: number;
};
export type ProjectPlanLimits = {
    nickname?: string;
    locked?: boolean;
    pieces?: string[];
    aiCredits?: number | null;
    piecesFilterType?: PiecesFilterType;
};
export declare enum ApSubscriptionStatus {
    ACTIVE = "active",
    CANCELED = "canceled"
}
export declare const METRIC_TO_LIMIT_MAPPING: {
    readonly [x: number]: "activeFlowsLimit";
};
export declare const METRIC_TO_USAGE_MAPPING: {
    readonly [x: number]: "activeFlows";
};
export declare const SetAiCreditsOverageLimitParamsSchema: import("@sinclair/typebox").TObject<{
    limit: import("@sinclair/typebox").TNumber;
}>;
export type SetAiCreditsOverageLimitParams = Static<typeof SetAiCreditsOverageLimitParamsSchema>;
export declare const ToggleAiCreditsOverageEnabledParamsSchema: import("@sinclair/typebox").TObject<{
    state: import("@sinclair/typebox").TEnum<any>;
}>;
export type ToggleAiCreditsOverageEnabledParams = Static<typeof ToggleAiCreditsOverageEnabledParamsSchema>;
export declare const UpdateActiveFlowsAddonParamsSchema: import("@sinclair/typebox").TObject<{
    newActiveFlowsLimit: import("@sinclair/typebox").TNumber;
}>;
export type UpdateActiveFlowsAddonParams = Static<typeof UpdateActiveFlowsAddonParamsSchema>;
export declare const CreateCheckoutSessionParamsSchema: import("@sinclair/typebox").TObject<{
    newActiveFlowsLimit: import("@sinclair/typebox").TNumber;
}>;
export type CreateSubscriptionParams = Static<typeof CreateCheckoutSessionParamsSchema>;
export declare enum PRICE_NAMES {
    AI_CREDITS = "ai-credit",
    ACTIVE_FLOWS = "active-flow"
}
export declare const PRICE_ID_MAP: {
    "ai-credit": {
        dev: string;
        prod: string;
    };
    "active-flow": {
        dev: string;
        prod: string;
    };
};
export declare const STANDARD_CLOUD_PLAN: PlatformPlanWithOnlyLimits;
export declare const RUSSIAN_PRO_PLAN: PlatformPlanWithOnlyLimits;
export declare const OPEN_SOURCE_PLAN: PlatformPlanWithOnlyLimits;
export declare const APPSUMO_PLAN: (planName: PlanName) => PlatformPlanWithOnlyLimits;
export declare const isCloudPlanButNotEnterprise: (plan?: string) => boolean;
export * from './sberbank.service';
