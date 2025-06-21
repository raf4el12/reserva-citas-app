import 'dotenv/config'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import { authBearer } from './middlewares/auth.js'
import errorMiddleware from './middlewares/error.js'
import router from './router.js'
import { APP_FRONTEND_URL, PORT } from './shared/shared.constants.js'

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
app.use(authBearer)
app.use('/api', router)
app.use(errorMiddleware)

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`)
})
