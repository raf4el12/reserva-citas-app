import { validAccessToken } from '../auth/auth.credential.js'

const EXEMPT_ENDPOINTS = ['/api/auth/login', '/api/auth/refresh']

export function authBearer(req, res, next) {
  if (EXEMPT_ENDPOINTS.includes(req.path)) {
    return next()
  }

  const { accessToken } = req.cookies

  const messageError = 'Credenciales no valida'

  if (!accessToken) {
    return res.status(401).json({ message: messageError })
  }

  const user = validAccessToken(accessToken)
  console.log('user', user)
  if (!user) {
    return res.status(401).json({ message: messageError })
  }

  req.user = user

  next()
}
