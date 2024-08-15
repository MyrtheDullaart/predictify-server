import { Router } from 'express'
import { validateAuthentication } from '../middleware/auth.js'
import { createForecast } from '../controllers/forecast.js'

const router = Router()

router.post('/', validateAuthentication, createForecast)

export default router