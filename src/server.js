import express from "express"
import morgan from "morgan"
import cors from "cors"
import authRouter from './routes/auth.js'

const app = express()

app.use(morgan("dev"))
app.use(cors())
app.use(express.json())

app.use('/', authRouter)

export default app