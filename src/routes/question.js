import { Router } from 'express'
import { getQuestionsByUserId } from '../controllers/question.js'
import { validateAuthentication } from '../middleware/auth.js'

const router = Router()

router.get('/', validateAuthentication, getQuestionsByUserId)

export default router