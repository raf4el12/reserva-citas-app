import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import router from './router.js'

// importas el router principal que junta todas las rutas
const app = express()
app.use(cookieParser())

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true, // permite enviar cookies y credenciales
  })
)
app.use(express.json())

app.use('/api', router) // prefijo general para todas las rutas

app.listen(3000, () => {
  console.log('Server listening on port 3000')
})
