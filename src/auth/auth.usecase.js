import bcrypt from 'bcrypt'

import prisma from '../../prisma/context.js'
import { UnauthorizedError } from '../shared/shared.http.error.js'
import { createdUser } from '../user/user.usecase.js'
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
      deleted: false,
    },
  })

  if (!user) throw new UnauthorizedError(messageError)

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) throw new UnauthorizedError(messageError)

  return {
    userId: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    validateEmail: user.validateEmail,
    accessToken: getAccessToken(user),
    refreshToken: getRefreshToken(user),
  }
}

const refreshToken = async (refreshToken) => {
  const payload = validRefreshToken(refreshToken)
  if (!payload) throw new UnauthorizedError(messageError)

  const user = await prisma.users.findFirst({
    where: {
      id: payload.userId,
      deleted: false,
    },
  })

  if (!user) throw new UnauthorizedError(messageError)

  return {
    accessToken: getAccessToken(user),
    refreshToken: getRefreshToken(user),
    userId: user.id,
  }
}

const signup = async (data) => {
  await createdUser(data)
}

export { login, refreshToken, signup }
