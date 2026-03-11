export type AllowedMimeTypes = 'image/png' | 'image/jpeg' | 'image/jpg' | 'image/gif';

type BaseUploadType = {
    sizeInMegaByte: number;
    allowedTypes: Array<AllowedMimeTypes>;
    path: string[];
    timestamp: boolean;
};

type SingleUpload = {
    type: 'single';
    fieldName: string;
} & BaseUploadType;

type ArrayUpload = {
    type: 'array';
    fieldName: string;
    maxCount: number;
} & BaseUploadType;

type FieldsUpload = {
    type: 'fields';
    fields: Array<{ name: string; maxCount: number }>;
} & BaseUploadType;

type AnyUpload = {
    type: 'any';
} & BaseUploadType;

type NoneUpload = {
    type: 'none';
} & BaseUploadType;

export type MulterInterceptorOpts =
    | SingleUpload
    | ArrayUpload
    | FieldsUpload
    | AnyUpload
    | NoneUpload;