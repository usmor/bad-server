import { NextFunction, Request, Response } from 'express'

/**
 * Middleware для установки заголовков безопасности
 * Защищает от XSS, clickjacking, MIME sniffing и контролирует referrer
 */
export const securityHeaders = (
    _req: Request,
    res: Response,
    next: NextFunction
) => {
    res.setHeader('X-Content-Type-Options', 'nosniff')
    res.setHeader('X-Frame-Options', 'DENY')
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin')

    next()
}

/**
 * Middleware для безопасной отправки JSON ответов
 */
export const sanitizeJsonResponse = (
    _req: Request,
    res: Response,
    next: NextFunction
) => {
    const originalJson = res.json

    res.json = function <T = any>(data: T) {
        const safeString = JSON.stringify(data)
            .replace(/</g, '\\u003c')
            .replace(/>/g, '\\u003e')
            .replace(/&/g, '\\u0026')
            .replace(/\u2028/g, '\\u2028')
            .replace(/\u2029/g, '\\u2029')

        return originalJson.call(this, JSON.parse(safeString))
    }

    next()
}
