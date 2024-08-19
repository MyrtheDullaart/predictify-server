import { Router } from 'express'
import { createQuestion, getQuestionsByUserId, resolveQuestion } from '../controllers/question.js'
import { validateAuthentication } from '../middleware/auth.js'

const router = Router()

router.get('/', validateAuthentication, getQuestionsByUserId)
router.patch('/', validateAuthentication, resolveQuestion)
router.post('/', validateAuthentication, createQuestion)

export default router