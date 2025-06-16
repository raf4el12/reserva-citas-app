import { validAccessToken } from "../auth/auth.credential.js"

export function authBearer(req, res, next) {
  const { accessToken } = req.cookies

  const messageError = 'Credenciales no valida'

  if (!accessToken) {
    return res.status(401).json({ message: messageError })
  }

  const user = validAccessToken(accessToken)
  if (!user) {
    return res.status(401).json({ message: messageError })
  }
  
  req.user = user

  next()
}
