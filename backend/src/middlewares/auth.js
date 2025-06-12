export function authBearer(req, res, next) {
  // 1. Validar que se envia el token
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Credenciales invalidas' });
  }

  // 2. Validar que el token es valido
  const token = authHeader.split(' ')[1];
  if (token !== 'app_reserva') {
    return res.status(401).json({ message: 'Credenciales invalidas' });
  }

  // 3. Validar si sigue habilitado para el usuario actaul


  next();
}
