import { Router } from 'express'
import { create, editUser, getUserById } from '../controllers/user.js'
import { validateAuthentication } from '../middleware/auth.js'

const router = Router()

router.post('/register', create)
router.get('/:id', validateAuthentication, getUserById)
router.patch('/', validateAuthentication, editUser)

export default router