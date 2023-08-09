import express from 'express'
import multer from 'multer'
import protect from '../../middlewares/auth.middleware.js'
import uploadImage from '../../controllers/file/uploadImage.controller.js'
import openImage from '../../controllers/file/openImage.controller.js'
import { verifyAccessToken } from '../../../utils/jwt/verifyToken.utils.js'

const router = express.Router()

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } })

router.post('/image', protect, verifyAccessToken, upload.single('image'), uploadImage)
router.get('/open', openImage)

export default router
