import { BaseModel, ProjectId } from '@Yflow/shared';
export type ConnectionKeyId = string;
export type ConnectionKey = {
    projectId: ProjectId;
    settings: SigningKeyConnection;
} & BaseModel<ConnectionKeyId>;
export type SigningKeyConnection = {
    type: ConnectionKeyType.SIGNING_KEY;
    publicKey: string;
    privateKey?: string;
};
export declare enum ConnectionKeyType {
    SIGNING_KEY = "SIGNING_KEY"
}
