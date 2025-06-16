import express from 'express';
import cors from 'cors'
import router from './router.js';
import cookieParser from 'cookie-parser';

 // importas el router principal que junta todas las rutas
const app = express();
app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true, // permite enviar cookies y credenciales
}))
app.use(express.json());

app.use('/api', router); // prefijo general para todas las rutas

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
