import { ApId } from '@Yflow/shared';
import { Static } from '@sinclair/typebox';
export declare enum KeyAlgorithm {
    RSA = "RSA"
}
export type SigningKeyId = ApId;
export declare const SigningKey: import("@sinclair/typebox").TObject<any>;
export type SigningKey = Static<typeof SigningKey>;
