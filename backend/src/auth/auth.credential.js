import jwt from 'jsonwebtoken'

import {
  ACCESS_TOKEN_MINUTE_SIGN_RELATIVE,
  ACCESS_TOKEN_SECRET,
} from '../shared/shared.constants.js'

const getAccessToken = () => {
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

export { getAccessToken }
