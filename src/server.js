import express from "express"
import morgan from "morgan"
import cors from "cors"
import authRouter from './routes/auth.js'
import userRouter from './routes/user.js'

const app = express()

app.use(morgan("dev"))
app.use(cors())
app.use(express.json())

app.use('/', authRouter)
app.use('/users', userRouter)

export default app