import { Static } from '@sinclair/typebox';
import { AlertChannel } from './alerts-dto';
export declare const ListAlertsParams: import("@sinclair/typebox").TObject<{
    projectId: any;
    cursor: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    limit: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
}>;
export type ListAlertsParams = Static<typeof ListAlertsParams>;
export declare const CreateAlertParams: import("@sinclair/typebox").TObject<{
    projectId: any;
    channel: import("@sinclair/typebox").TEnum<typeof AlertChannel>;
    receiver: import("@sinclair/typebox").TString;
}>;
export type CreateAlertParams = Static<typeof CreateAlertParams>;
