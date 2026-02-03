
import { Type } from '@sinclair/typebox'

export const BaseModelSchema = { // لازم كلمة export تكون موجودة هنا
    id: Type.String(),
    created: Type.String(),
    updated: Type.String(),
}
