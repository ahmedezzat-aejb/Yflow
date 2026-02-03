import { Static } from '@sinclair/typebox';
export declare const VerifyEmailRequestBody: import("@sinclair/typebox").TObject<{
    identityId: any;
    otp: import("@sinclair/typebox").TString;
}>;
export type VerifyEmailRequestBody = Static<typeof VerifyEmailRequestBody>;
export declare const ResetPasswordRequestBody: import("@sinclair/typebox").TObject<{
    identityId: any;
    otp: import("@sinclair/typebox").TString;
    newPassword: import("@sinclair/typebox").TString;
}>;
export type ResetPasswordRequestBody = Static<typeof ResetPasswordRequestBody>;
export declare const SignUpAndAcceptRequestBody: import("@sinclair/typebox").TObject<{}>;
export type SignUpAndAcceptRequestBody = Static<typeof SignUpAndAcceptRequestBody>;
