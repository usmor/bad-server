import { NextFunction, Request, Response } from 'express'
import fs from 'fs'
import path from 'path'

export default function serveStatic(baseDir: string) {
    const safeBase = path.resolve(baseDir)

    return (req: Request, res: Response, next: NextFunction) => {
        const normalizedPath = path.normalize(req.path)
        const safePath = normalizedPath.replace(/^(\.\.(\/|\\|$))+/, '')

        const filePath = path.resolve(path.join(safeBase, safePath))

        if (!filePath.startsWith(safeBase)) {
            return res.status(403).send('Forbidden')
        }

        // Проверяем, существует ли файл
        fs.access(filePath, fs.constants.F_OK, (err) => {
            if (err) {
                // Файл не существует отдаем дальше мидлварам
                return next()
            }
            // Файл существует, отправляем его клиенту
            return res.sendFile(filePath, (sendErr) => {
                if (sendErr) {
                    next(sendErr)
                }
            })
        })
    }
}
