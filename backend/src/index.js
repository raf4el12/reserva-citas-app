import 'dotenv/config'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import router from './router.js'
import { PORT } from './shared/shared.constants.js'

const app = express()

app.use(cookieParser())

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
)
app.use(express.json())

app.use('/api', router)

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
