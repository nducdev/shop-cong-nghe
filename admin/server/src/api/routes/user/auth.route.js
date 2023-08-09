import express from 'express'
import logout from '../../controllers/auth/logout.controller.js'
import loginStatus from '../../controllers/auth/loginStatus.controller.js'
import protect from '../../middlewares/auth.middleware.js'
import checkLoggedIn from '../../middlewares/checkLoggedIn.middleware.js'
import checkBlocked from '../../middlewares/block.middleware.js'
import limit from '../../middlewares/limit.middleware.js'
import { verifyAccessToken } from '../../../utils/jwt/verifyToken.utils.js'
import loginAdmin from '../../controllers/auth/loginAdmin.controller.js'

const router = express.Router()

router.post('/loginAdmin', checkBlocked, checkLoggedIn, limit.rateLimiter(10, 2 * 60 * 60), loginAdmin)
router.post('/logout', protect, verifyAccessToken, logout)
router.get('/loggedin', loginStatus)

export default router
