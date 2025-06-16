import jwt from 'jsonwebtoken'

const SECRET_KEY = process.env.JWT_SECRET || 'some_secret_key'

export function authBearer(req, res, next) {
  const authHeader = req.headers.authorization

  const token = authHeader?.startsWith('Bearer ')
    ? authHeader.split(' ')[1]
    : null

  const messageError = 'Credenciales no valida'

  if (token !== 'test') {
    return res.status(401).json({ message: messageError })
  }

  // try {
  //   const decoded = jwt.verify(token, SECRET_KEY)
  //   req.user = decoded
  //   next()
  // } catch (err) {
  //   return res.status(401).json({ message: messageError })
  // }
  next()
}
