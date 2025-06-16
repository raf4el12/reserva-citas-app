import { ACCESS_TOKEN_MINUTE_SIGN_NOMINAL } from '../shared/shared.constants.js'
import * as authUserCase from './auth.usecase.js'

const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const users = await authUserCase.login(email, password)
    res.cookie('token', users.token, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: ACCESS_TOKEN_MINUTE_SIGN_NOMINAL,
    })
    const { token, ...userData } = users
    res.json(userData)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
export { login }
