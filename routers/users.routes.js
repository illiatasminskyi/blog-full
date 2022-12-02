import express from 'express'
import { UserControllers } from '../controllers/index.js'
// import checkAuth from '../utils/checkAuth.js'
// import { registerValidation } from '../validations.js'

const router = express.Router()

router.get('/one/:id', UserControllers.getOneUser)
router.get('/all', UserControllers.getUsers)

export default router
