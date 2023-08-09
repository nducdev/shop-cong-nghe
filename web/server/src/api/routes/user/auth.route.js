import '../../middlewares/passport.js'
import express from 'express'
import register from '../../controllers/auth/register.controller.js'
import login from '../../controllers/auth/login.controller.js'
import logout from '../../controllers/auth/logout.controller.js'
import loginStatus from '../../controllers/auth/loginStatus.controller.js'
import protect from '../../middlewares/auth.middleware.js'
import checkLoggedIn from '../../middlewares/checkLoggedIn.middleware.js'
import checkBlocked from '../../middlewares/block.middleware.js'
import limit from '../../middlewares/limit.middleware.js'
import { verifyAccessToken } from '../../../utils/jwt/verifyToken.utils.js'

const router = express.Router()

router.post('/register', checkLoggedIn, checkBlocked, limit.rateLimiter(10, 2 * 60 * 60), register)
router.post('/login', checkLoggedIn, checkBlocked, limit.rateLimiter(10, 2 * 60 * 60), login)
router.post('/logout', protect, verifyAccessToken, logout)
router.get('/loggedin', loginStatus)

export default router
