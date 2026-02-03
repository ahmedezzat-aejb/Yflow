import { Static } from '@sinclair/typebox';
import { OtpType } from './otp-type';
export declare const CreateOtpRequestBody: import("@sinclair/typebox").TObject<{
    email: import("@sinclair/typebox").TString;
    type: import("@sinclair/typebox").TEnum<typeof OtpType>;
}>;
export type CreateOtpRequestBody = Static<typeof CreateOtpRequestBody>;
