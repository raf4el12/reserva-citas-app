import bcrypt from 'bcrypt'

import prisma from '../../prisma/context.js'
import { UnauthorizedError } from '../shared/shared.http.error.js'
import {
  getAccessToken,
  getRefreshToken,
  validRefreshToken,
} from './auth.credential.js'

const messageError = 'Credenciales no validas'

const login = async (email, password) => {
  const user = await prisma.users.findFirst({
    where: {
      email,
    },
  })

  if (!user) throw new UnauthorizedError(messageError)

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) throw new UnauthorizedError(messageError)

  return {
    userId: user.id,
    email: user.email,
    accessToken: getAccessToken(user),
    refreshToken: getRefreshToken(user),
  }
}

const refreshToken = async (refreshToken) => {
  const user = validRefreshToken(refreshToken)
  if (!user) throw new UnauthorizedError(messageError)

  return {
    accessToken: getAccessToken(user),
    refreshToken: getRefreshToken(user),
    userId: user.userId,
  }
}

export { login, refreshToken }
