import express from 'express'
import { PostsController } from '../controllers/index.js'
import checkAuth from '../utils/checkAuth.js'

const router = express.Router()

router.get('/posts', PostsController.getAll)
router.get('/posts/:id', PostsController.getOne)
router.post('/posts', checkAuth, PostsController.create)
router.delete('/posts/:id', checkAuth, PostsController.delete)
router.patch('/posts/:id', checkAuth, PostsController.update)

export default router
