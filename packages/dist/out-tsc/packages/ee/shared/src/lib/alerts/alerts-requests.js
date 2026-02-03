import { ApId } from '../../../../common/src/apid'; // <-- Make sure this path and file exist, or update to the correct path
import { Type } from '@sinclair/typebox';
import { AlertChannel } from './alerts-dto';
export const ListAlertsParams = Type.Object({
    projectId: ApId,
    cursor: Type.Optional(Type.String()),
    limit: Type.Optional(Type.Integer({ minimum: 1, maximum: 100 })),
});
export const CreateAlertParams = Type.Object({
    projectId: ApId,
    channel: Type.Enum(AlertChannel),
    receiver: Type.String({}),
});
//# sourceMappingURL=alerts-requests.js.map