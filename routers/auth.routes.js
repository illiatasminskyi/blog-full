import express from 'express'
import { AuthControllers } from '../controllers/index.js'
import checkAuth from '../utils/checkAuth.js'
import { registerValidation } from '../validations.js'

const router = express.Router()

router.post('/login', AuthControllers.login)
router.post('/register', registerValidation, AuthControllers.register)
router.get('/me', checkAuth, AuthControllers.getMe)

export default router
