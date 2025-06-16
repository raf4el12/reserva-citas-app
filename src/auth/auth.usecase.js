import bcrypt from 'bcrypt'

import prisma from '../../prisma/context.js'
import { getAccessToken } from './auth.credential.js'

const login = async (email, password) => {
  const user = await prisma.users.findFirst({
    where: {
      email,
    },
  })

  const messageError = 'Credenciales no validas'
  if (!user) throw new Error(messageError)

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) throw new Error(messageError)

  return {
    userId: user.id,
    email: user.email,
    accessToken: getAccessToken(user),
  }
}

export { login }
