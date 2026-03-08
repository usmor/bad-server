import { doubleCsrf } from 'csrf-csrf'
import { Request } from 'express'

const { generateCsrfToken, doubleCsrfProtection } = doubleCsrf({
    getSecret: () => process.env.CSRF_SECRET || 'secret',
    getSessionIdentifier: (req: Request) => req.ip || 'anonymous',
    cookieName: 'csrf-token',
    cookieOptions: {
        httpOnly: true,
        sameSite: 'strict',
        secure: false,
    },
})

export { generateCsrfToken, doubleCsrfProtection }
