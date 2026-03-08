import { Router } from 'express'
import { uploadFile } from '../controllers/upload'
import fileMiddleware from '../middlewares/file'
import { uploadLimiter } from '../middlewares/limiter'
import { checkMinFileSize } from '../middlewares/file'

const uploadRouter = Router()
uploadRouter.post(
    '/',
    uploadLimiter,
    fileMiddleware.single('file'),
    checkMinFileSize,
    uploadFile
)

export default uploadRouter
