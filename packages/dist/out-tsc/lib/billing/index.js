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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCloudPlanButNotEnterprise = exports.APPSUMO_PLAN = exports.OPEN_SOURCE_PLAN = exports.RUSSIAN_PRO_PLAN = exports.STANDARD_CLOUD_PLAN = exports.PRICE_ID_MAP = exports.PRICE_NAMES = exports.CreateCheckoutSessionParamsSchema = exports.UpdateActiveFlowsAddonParamsSchema = exports.ToggleAiCreditsOverageEnabledParamsSchema = exports.SetAiCreditsOverageLimitParamsSchema = exports.METRIC_TO_USAGE_MAPPING = exports.METRIC_TO_LIMIT_MAPPING = exports.ApSubscriptionStatus = exports.SBERBANK_PRICES = exports.SBERBANK_PLANS = exports.AI_CREDITS_USAGE_THRESHOLD = exports.PRICE_PER_EXTRA_ACTIVE_FLOWS = void 0;
var shared_1 = require("@Yflow/shared");
var typebox_1 = require("@sinclair/typebox");
exports.PRICE_PER_EXTRA_ACTIVE_FLOWS = 5;
exports.AI_CREDITS_USAGE_THRESHOLD = 15000;
// --- أضفنا أسعار سبير بنك هنا ---
var SBERBANK_PLANS;
(function (SBERBANK_PLANS) {
    SBERBANK_PLANS["PRO"] = "PRO_RUB";
    SBERBANK_PLANS["ENTERPRISE"] = "ENTERPRISE_RUB";
})(SBERBANK_PLANS || (exports.SBERBANK_PLANS = SBERBANK_PLANS = {}));
exports.SBERBANK_PRICES = (_a = {},
    _a[SBERBANK_PLANS.PRO] = 2500,
    _a[SBERBANK_PLANS.ENTERPRISE] = 10000,
    _a);
var ApSubscriptionStatus;
(function (ApSubscriptionStatus) {
    ApSubscriptionStatus["ACTIVE"] = "active";
    ApSubscriptionStatus["CANCELED"] = "canceled";
})(ApSubscriptionStatus || (exports.ApSubscriptionStatus = ApSubscriptionStatus = {}));
exports.METRIC_TO_LIMIT_MAPPING = (_b = {},
    _b[shared_1.PlatformUsageMetric.ACTIVE_FLOWS] = 'activeFlowsLimit',
    _b);
exports.METRIC_TO_USAGE_MAPPING = (_c = {},
    _c[shared_1.PlatformUsageMetric.ACTIVE_FLOWS] = 'activeFlows',
    _c);
exports.SetAiCreditsOverageLimitParamsSchema = typebox_1.Type.Object({
    limit: typebox_1.Type.Number({ minimum: 10 }),
});
exports.ToggleAiCreditsOverageEnabledParamsSchema = typebox_1.Type.Object({
    state: typebox_1.Type.Enum(shared_1.AiOverageState),
});
exports.UpdateActiveFlowsAddonParamsSchema = typebox_1.Type.Object({
    newActiveFlowsLimit: typebox_1.Type.Number(),
});
exports.CreateCheckoutSessionParamsSchema = typebox_1.Type.Object({
    newActiveFlowsLimit: typebox_1.Type.Number(),
});
var PRICE_NAMES;
(function (PRICE_NAMES) {
    PRICE_NAMES["AI_CREDITS"] = "ai-credit";
    PRICE_NAMES["ACTIVE_FLOWS"] = "active-flow";
})(PRICE_NAMES || (exports.PRICE_NAMES = PRICE_NAMES = {}));
exports.PRICE_ID_MAP = (_d = {},
    _d[PRICE_NAMES.AI_CREDITS] = {
        dev: 'price_1RnbNPQN93Aoq4f8GLiZbJFj',
        prod: 'price_1Rnj5bKZ0dZRqLEKQx2gwL7s',
    },
    _d[PRICE_NAMES.ACTIVE_FLOWS] = {
        dev: 'price_1SQbbYQN93Aoq4f8WK2JC4sf',
        prod: 'price_1SQbcvKZ0dZRqLEKHV5UepRx',
    },
    _d);
exports.STANDARD_CLOUD_PLAN = {
    plan: 'standard',
    includedAiCredits: 200,
    aiCreditsOverageLimit: undefined,
    aiCreditsOverageState: shared_1.AiOverageState.ALLOWED_BUT_OFF,
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
    teamProjectsLimit: shared_1.TeamProjectsLimit.ONE,
    projectRolesEnabled: false,
    customDomainsEnabled: false,
    apiKeysEnabled: false,
    ssoEnabled: false,
};
// --- خطة البرو الروسية المعدلة لـ Yflow ---
exports.RUSSIAN_PRO_PLAN = __assign(__assign({}, exports.STANDARD_CLOUD_PLAN), { plan: 'pro', includedAiCredits: 5000, activeFlowsLimit: 100, customAppearanceEnabled: true, customDomainsEnabled: true });
exports.OPEN_SOURCE_PLAN = {
    embeddingEnabled: false,
    globalConnectionsEnabled: false,
    customRolesEnabled: false,
    mcpsEnabled: true,
    tablesEnabled: true,
    todosEnabled: true,
    agentsEnabled: true,
    includedAiCredits: 0,
    aiCreditsOverageLimit: undefined,
    aiCreditsOverageState: shared_1.AiOverageState.NOT_ALLOWED,
    environmentsEnabled: false,
    analyticsEnabled: false,
    showPoweredBy: false,
    auditLogEnabled: false,
    managePiecesEnabled: false,
    manageTemplatesEnabled: false,
    customAppearanceEnabled: false,
    teamProjectsLimit: shared_1.TeamProjectsLimit.NONE,
    projectRolesEnabled: false,
    customDomainsEnabled: false,
    apiKeysEnabled: false,
    ssoEnabled: false,
    stripeCustomerId: undefined,
    stripeSubscriptionId: undefined,
    stripeSubscriptionStatus: undefined,
};
var APPSUMO_PLAN = function (planName) { return (__assign(__assign({}, exports.STANDARD_CLOUD_PLAN), { plan: planName, activeFlowsLimit: undefined })); };
exports.APPSUMO_PLAN = APPSUMO_PLAN;
var isCloudPlanButNotEnterprise = function (plan) {
    if ((0, shared_1.isNil)(plan)) {
        return false;
    }
    return plan === shared_1.PlanName.STANDARD || plan === 'pro';
};
exports.isCloudPlanButNotEnterprise = isCloudPlanButNotEnterprise;
__exportStar(require("./sberbank.service"), exports);
