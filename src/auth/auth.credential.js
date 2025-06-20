import jwt from 'jsonwebtoken'

import {
  ACCESS_TOKEN_MINUTE_SIGN_RELATIVE,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_MINUTE_SIGN_RELATIVE,
  REFRESH_TOKEN_SECRET,
} from '../shared/shared.constants.js'

const getAccessToken = (user) => {
  if (!user) throw new Error('usuario requerido')

  const accessToken = jwt.sign(
    {
      userId: user.id,
      email: user.email,
      role: user.role,
    },
    ACCESS_TOKEN_SECRET,
    {
      expiresIn: ACCESS_TOKEN_MINUTE_SIGN_RELATIVE,
    }
  )

  return accessToken
}

const validAccessToken = (accessToken) => {
  try {
    const decoded = jwt.verify(accessToken, ACCESS_TOKEN_SECRET)

    return decoded
  } catch {
    return null
  }
}

const getRefreshToken = (user) => {
  if (!user) throw new Error('usuario requerido')

  const refreshToken = jwt.sign(
    {
      userId: user.id,
      email: user.email,
      role: user.role,
    },
    REFRESH_TOKEN_SECRET,
    {
      expiresIn: REFRESH_TOKEN_MINUTE_SIGN_RELATIVE,
    }
  )

  return refreshToken
}

const validRefreshToken = (refreshToken) => {
  try {
    const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET)

    return decoded
  } catch {
    return null
  }
}

export { getAccessToken, getRefreshToken, validAccessToken, validRefreshToken }
