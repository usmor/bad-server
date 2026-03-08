import { Router } from 'express'
import {
    getCurrentUser,
    getCurrentUserRoles,
    login,
    logout,
    refreshAccessToken,
    register,
    updateCurrentUser,
} from '../controllers/auth'
import auth from '../middlewares/auth'
import { authLimiter } from '../middlewares/limiter'
import { doubleCsrfProtection, generateCsrfToken } from '../middlewares/csrf'

const authRouter = Router()

authRouter.get('/csrf-token', (req, res) => {
    const token = generateCsrfToken(req, res)
    res.json({ csrfToken: token })
})

authRouter.get('/user', auth, getCurrentUser)
authRouter.patch('/me', auth, doubleCsrfProtection, updateCurrentUser)
authRouter.get('/user/roles', auth, getCurrentUserRoles)
authRouter.post('/login', authLimiter, login)
authRouter.get('/token', authLimiter, refreshAccessToken)
authRouter.get('/logout', logout)
authRouter.post('/register', authLimiter, register)

export default authRouter
