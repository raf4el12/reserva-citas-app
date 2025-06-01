import express from 'express';
import cors from 'cors'
import router from './router.js'; // importas el router principal que junta todas las rutas
const app = express();

app.use(cors({
  origin: '*'
}))
app.use(express.json());

app.use('/api', router); // prefijo general para todas las rutas

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
