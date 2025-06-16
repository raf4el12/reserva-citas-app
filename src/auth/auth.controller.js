import { ACCESS_TOKEN_MINUTE_SIGN_NOMINAL } from '../shared/shared.constants.js'
import * as authUserCase from './auth.usecase.js'

const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await authUserCase.login(email, password)
  
    res.cookie('accessToken', user.accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: ACCESS_TOKEN_MINUTE_SIGN_NOMINAL,
    })

    const { accessToken, ...userData } = user
    
    res.json(userData)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
export { login }
