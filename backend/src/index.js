const express = require('express');
const app = express();
require('dotenv').config();

app.use(express.json());

const router = require('./router');
app.use('/api', router);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
