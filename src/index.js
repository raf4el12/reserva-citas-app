import 'dotenv/config'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import morgan from 'morgan'
import express from 'express'
import router from './router.js'
import { PORT, APP_FRONTEND_URL } from './shared/shared.constants.js'

const app = express()

app.use(cookieParser())
app.use(
  cors({
    origin: APP_FRONTEND_URL,
    credentials: true,
  })
)
app.use(morgan('dev'))
app.use(express.json())

app.use('/api', router)

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`)
})
