export enum PropertyType {
    SHORT_TEXT = 'SHORT_TEXT',
    NUMBER = 'NUMBER',
    CHECKBOX = 'CHECKBOX',
    SELECT = 'SELECT',
}

export interface BasePropertySchema {
    displayName: string;
    description?: string;
    required: boolean;
}
