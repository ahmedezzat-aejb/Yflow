import { AiOverageState, isNil, PlanName, PlatformUsageMetric, TeamProjectsLimit } from '@Yflow/shared';
import { Type } from '@sinclair/typebox';
export const PRICE_PER_EXTRA_ACTIVE_FLOWS = 5;
export const AI_CREDITS_USAGE_THRESHOLD = 15000;
// --- أضفنا أسعار سبير بنك هنا ---
export var SBERBANK_PLANS;
(function (SBERBANK_PLANS) {
    SBERBANK_PLANS["PRO"] = "PRO_RUB";
    SBERBANK_PLANS["ENTERPRISE"] = "ENTERPRISE_RUB";
})(SBERBANK_PLANS || (SBERBANK_PLANS = {}));
export const SBERBANK_PRICES = {
    [SBERBANK_PLANS.PRO]: 2500,
    [SBERBANK_PLANS.ENTERPRISE]: 10000
};
export var ApSubscriptionStatus;
(function (ApSubscriptionStatus) {
    ApSubscriptionStatus["ACTIVE"] = "active";
    ApSubscriptionStatus["CANCELED"] = "canceled";
})(ApSubscriptionStatus || (ApSubscriptionStatus = {}));
export const METRIC_TO_LIMIT_MAPPING = {
    [PlatformUsageMetric.ACTIVE_FLOWS]: 'activeFlowsLimit',
};
export const METRIC_TO_USAGE_MAPPING = {
    [PlatformUsageMetric.ACTIVE_FLOWS]: 'activeFlows',
};
export const SetAiCreditsOverageLimitParamsSchema = Type.Object({
    limit: Type.Number({ minimum: 10 }),
});
export const ToggleAiCreditsOverageEnabledParamsSchema = Type.Object({
    state: Type.Enum(AiOverageState),
});
export const UpdateActiveFlowsAddonParamsSchema = Type.Object({
    newActiveFlowsLimit: Type.Number(),
});
export const CreateCheckoutSessionParamsSchema = Type.Object({
    newActiveFlowsLimit: Type.Number(),
});
export var PRICE_NAMES;
(function (PRICE_NAMES) {
    PRICE_NAMES["AI_CREDITS"] = "ai-credit";
    PRICE_NAMES["ACTIVE_FLOWS"] = "active-flow";
})(PRICE_NAMES || (PRICE_NAMES = {}));
export const PRICE_ID_MAP = {
    [PRICE_NAMES.AI_CREDITS]: {
        dev: 'price_1RnbNPQN93Aoq4f8GLiZbJFj',
        prod: 'price_1Rnj5bKZ0dZRqLEKQx2gwL7s',
    },
    [PRICE_NAMES.ACTIVE_FLOWS]: {
        dev: 'price_1SQbbYQN93Aoq4f8WK2JC4sf',
        prod: 'price_1SQbcvKZ0dZRqLEKHV5UepRx',
    },
};
export const STANDARD_CLOUD_PLAN = {
    plan: 'standard',
    includedAiCredits: 200,
    aiCreditsOverageLimit: undefined,
    aiCreditsOverageState: AiOverageState.ALLOWED_BUT_OFF,
    activeFlowsLimit: 10,
    projectsLimit: 1,
    agentsEnabled: true,
    tablesEnabled: true,
    todosEnabled: true,
    mcpsEnabled: true,
    embeddingEnabled: false,
    globalConnectionsEnabled: false,
    customRolesEnabled: false,
    environmentsEnabled: false,
    analyticsEnabled: false,
    showPoweredBy: false,
    auditLogEnabled: false,
    managePiecesEnabled: false,
    manageTemplatesEnabled: false,
    customAppearanceEnabled: false,
    teamProjectsLimit: TeamProjectsLimit.ONE,
    projectRolesEnabled: false,
    customDomainsEnabled: false,
    apiKeysEnabled: false,
    ssoEnabled: false,
};
// --- خطة البرو الروسية المعدلة لـ Yflow ---
export const RUSSIAN_PRO_PLAN = Object.assign(Object.assign({}, STANDARD_CLOUD_PLAN), { plan: 'pro', includedAiCredits: 5000, activeFlowsLimit: 100, customAppearanceEnabled: true, customDomainsEnabled: true });
export const OPEN_SOURCE_PLAN = {
    embeddingEnabled: false,
    globalConnectionsEnabled: false,
    customRolesEnabled: false,
    mcpsEnabled: true,
    tablesEnabled: true,
    todosEnabled: true,
    agentsEnabled: true,
    includedAiCredits: 0,
    aiCreditsOverageLimit: undefined,
    aiCreditsOverageState: AiOverageState.NOT_ALLOWED,
    environmentsEnabled: false,
    analyticsEnabled: false,
    showPoweredBy: false,
    auditLogEnabled: false,
    managePiecesEnabled: false,
    manageTemplatesEnabled: false,
    customAppearanceEnabled: false,
    teamProjectsLimit: TeamProjectsLimit.NONE,
    projectRolesEnabled: false,
    customDomainsEnabled: false,
    apiKeysEnabled: false,
    ssoEnabled: false,
    stripeCustomerId: undefined,
    stripeSubscriptionId: undefined,
    stripeSubscriptionStatus: undefined,
};
export const APPSUMO_PLAN = (planName) => (Object.assign(Object.assign({}, STANDARD_CLOUD_PLAN), { plan: planName, activeFlowsLimit: undefined }));
export const isCloudPlanButNotEnterprise = (plan) => {
    if (isNil(plan)) {
        return false;
    }
    return plan === PlanName.STANDARD || plan === 'pro';
};
export * from './sberbank.service';
//# sourceMappingURL=index.js.map