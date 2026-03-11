import multer from 'multer';
import { Request } from 'express';
import path from 'node:path';
import fs from 'node:fs';
import { AllowedMimeTypes, MulterInterceptorOpts } from 'src/types/multer.type';

export default function MulterInterceptor(opts: MulterInterceptorOpts) {
    const storage = multer.diskStorage({
        destination: (_req, _file, cb) => {
            const uploadPath = path.join(...opts.path);
            fs.mkdirSync(uploadPath, { recursive: true });
            cb(null, uploadPath);
        },
        filename: (_req, file, cb) => {
            let fileName = file.originalname;
            if (opts.timestamp) {
                fileName = `${Date.now()}-${fileName}`;
            }
            cb(null, fileName);
        }
    });

    const fileFilter = (_req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
        if (opts.allowedTypes.includes(file.mimetype as AllowedMimeTypes)) {
            cb(null, true);
        } else {
            cb(new Error(`Invalid file type: ${file.mimetype}.`));
        }
    };

    const multerArguments = {
        storage,
        limits: { fileSize: opts.sizeInMegaByte * 1024 * 1024 },
        fileFilter,
    };

    switch (opts.type) {
        case 'single':
            return multer(multerArguments).single(opts.fieldName);
        case 'array':
            return multer(multerArguments).array(opts.fieldName, opts.maxCount);
        case 'fields':
            return multer(multerArguments).fields(opts.fields);
        case 'none':
            return multer(multerArguments).none();
        case 'any':
            return multer(multerArguments).any();
    }
}