// Update the import path below to the correct location of your shared module
import { ApId, BaseModelSchema } from '../../../../../shared/src/index';
import { Type } from '@sinclair/typebox';
export var AlertChannel;
(function (AlertChannel) {
    AlertChannel["EMAIL"] = "EMAIL";
})(AlertChannel || (AlertChannel = {}));
export const Alert = Type.Object(Object.assign(Object.assign({}, BaseModelSchema), { projectId: ApId, channel: Type.Enum(AlertChannel), receiver: Type.String({}) }));
//# sourceMappingURL=alerts-dto.js.map