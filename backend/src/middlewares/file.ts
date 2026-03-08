import { Request, Express, NextFunction, Response } from 'express'
import multer, { FileFilterCallback } from 'multer'
import { join, extname } from 'path'

type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void

const allowedExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.svg']

const storage = multer.diskStorage({
    destination: (
        _req: Request,
        _file: Express.Multer.File,
        cb: DestinationCallback
    ) => {
        cb(
            null,
            join(
                __dirname,
                process.env.UPLOAD_PATH_TEMP
                    ? `../public/${process.env.UPLOAD_PATH_TEMP}`
                    : '../public'
            )
        )
    },

    filename: (
        _req: Request,
        file: Express.Multer.File,
        cb: FileNameCallback
    ) => {
        const extension = extname(file.originalname).toLowerCase()

        if (!allowedExtensions.includes(extension)) {
            return cb(new Error('Недопустимый формат файла'), '')
        }

        const safeName = crypto.randomUUID() + extension

        cb(null, safeName)
    },
})

const types = [
    'image/png',
    'image/jpg',
    'image/jpeg',
    'image/gif',
    'image/svg+xml',
]

const fileFilter = (
    _req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
) => {
    if (!types.includes(file.mimetype)) {
        return cb(null, false)
    }

    return cb(null, true)
}

export default multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024,
        files: 1,
        fieldNameSize: 100,
        fieldSize: 1024 * 1024,
        fields: 10,
        parts: 20,
    },
})

export const checkMinFileSize = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const file = req.file

    if (!file) {
        return res.status(400).json({ message: 'Файл не загружен' })
    }

    if (file.size < 2 * 1024) {
        return res.status(400).json({
            message: 'Файл слишком маленький',
        })
    }

    next()
}
