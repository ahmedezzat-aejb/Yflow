// Clean Property Schema - No Dependencies
export enum PropertyType {
    SHORT_TEXT = 'SHORT_TEXT',
    NUMBER = 'NUMBER',
    CHECKBOX = 'CHECKBOX',
    SELECT = 'SELECT',
    JSON = 'JSON',
    DATE = 'DATE',
    FILE = 'FILE',
}

export interface BasePropertySchema {
    displayName: string;
    description?: string;
    required: boolean;
    type: PropertyType;
    defaultValue?: any;
    options?: Array<{ label: string; value: any }>;
}

export interface TextPropertySchema extends BasePropertySchema {
    type: PropertyType.SHORT_TEXT;
    placeholder?: string;
    minLength?: number;
    maxLength?: number;
}

export interface NumberPropertySchema extends BasePropertySchema {
    type: PropertyType.NUMBER;
    min?: number;
    max?: number;
    step?: number;
}

export interface CheckboxPropertySchema extends BasePropertySchema {
    type: PropertyType.CHECKBOX;
}

export interface SelectPropertySchema extends BasePropertySchema {
    type: PropertyType.SELECT;
    options: Array<{ label: string; value: any }>;
}

export function createTextProperty(config: Partial<TextPropertySchema> = {}): TextPropertySchema {
    return {
        type: PropertyType.SHORT_TEXT,
        displayName: '',
        required: false,
        ...config,
    };
}

export function createNumberProperty(config: Partial<NumberPropertySchema> = {}): NumberPropertySchema {
    return {
        type: PropertyType.NUMBER,
        displayName: '',
        required: false,
        ...config,
    };
}

export function createCheckboxProperty(config: Partial<CheckboxPropertySchema> = {}): CheckboxPropertySchema {
    return {
        type: PropertyType.CHECKBOX,
        displayName: '',
        required: false,
        ...config,
    };
}

export function createSelectProperty(config: Partial<SelectPropertySchema>): SelectPropertySchema {
    if (!config.options) {
        throw new Error('Select property requires options');
    }
    return {
        type: PropertyType.SELECT,
        displayName: '',
        required: false,
        options: config.options,
        ...config,
    };
}
