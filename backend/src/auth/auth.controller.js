import * as authUserCase from './auth.usecase.js';

const login = async (req, res) => {
  try {
    const { email, password } = req.body
// En tu controlador
    const users = await authUserCase.login(email, password);
    res.cookie('token', users.token, { httpOnly: true, secure: false, sameSite: 'strict' , maxHAge: 1000 * 60 * 10 }); // 10 minutos de expiracion
// Si no quieres enviar el token en el JSON:
    const { token, ...userData } = users;
    res.json(userData);
    } catch (error) {
      res.status(500).json({ message: error.message });
  }
}
export {
  login
}