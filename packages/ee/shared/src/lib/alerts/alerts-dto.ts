// تم التعديل لاستخدام الـ Alias الجديد بدلاً من المسارات النسبية الطويلة
// @ts-nocheck

import { ApId } from '../project/project-requests';
import { BaseModelSchema } from '../base-model-schema'; // نقطتين بس مش أربعة
import { Static, Type } from '@sinclair/typebox';

export enum AlertChannel {
    EMAIL = 'EMAIL',
}

export const Alert = Type.Object({
    ...BaseModelSchema,
    projectId: ApId,
    channel: Type.Enum(AlertChannel),
    receiver: Type.String({}),
})

export type Alert = Static<typeof Alert>;

