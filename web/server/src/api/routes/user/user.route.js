import express from 'express'
import getUser from '../../controllers/user/getUser.controller.js'
import getCurrentUser from '../../controllers/user/getCurrentUser.controller.js'
import getAllUser from '../../controllers/user/getAllUser.controller.js'
import updateUser from '../../controllers/user/updateUser.controller.js'
import deleteUser from '../../controllers/user/deleteUser.controller.js'
import followUser from '../../controllers/user/followUser.controller.js'
import findUser from '../../controllers/user/findUser.controller.js'
import refreshToken from '../../controllers/user/refreshToken.controller.js'
import protect from '../../middlewares/auth.middleware.js'
import limit from '../../middlewares/limit.middleware.js'
import checkRole from '../../middlewares/checkRole.middleware.js'
import { validateParam } from '../../../validator/params.validator.js'
import { schemas } from '../../../validator/schemas.js'
import { verifyAccessToken } from '../../../utils/jwt/verifyToken.utils.js'
import changePassword from '../../controllers/user/changePassword.controller.js'

const router = express.Router()

router.get('/users', protect, verifyAccessToken, checkRole(['admin', 'mod']), getAllUser)
router.post('/finduser', findUser)
router.post('/detail-user', protect, verifyAccessToken, getCurrentUser)
router.post('/refresh-token', refreshToken)
router.get('/:userID', validateParam(schemas.idSchema, 'userID'), verifyAccessToken, getUser)
router.put('/update-user', protect, verifyAccessToken, updateUser)
router.put(
    '/:userID/follow',
    validateParam(schemas.idSchema, 'userID'),
    protect,
    verifyAccessToken,
    followUser
)
router.post('/delete-user', protect, verifyAccessToken, deleteUser)
router.put('/change-password', protect, verifyAccessToken, changePassword)

export default router
