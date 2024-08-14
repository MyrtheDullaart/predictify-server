import express from "express"
import morgan from "morgan"
import cors from "cors"
import authRouter from './routes/auth.js'
import userRouter from './routes/user.js'
import questionRouter from './routes/question.js'

const app = express()

app.use(morgan("dev"))
app.use(cors())
app.use(express.json())

app.use('/', authRouter)
app.use('/users', userRouter)
app.use('/questions', questionRouter)

export default app