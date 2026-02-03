import { ApId } from '@Yflow/shared';
import { Static } from '@sinclair/typebox';
export type OtpId = ApId;
export declare enum OtpState {
    PENDING = "PENDING",
    CONFIRMED = "CONFIRMED"
}
export declare const OtpModel: import("@sinclair/typebox").TObject<any>;
export type OtpModel = Static<typeof OtpModel>;
