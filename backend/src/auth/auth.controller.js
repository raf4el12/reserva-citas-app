import * as authUserCase from './auth.usecase.js';

const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const users = await authUserCase.login(email, password);
    res.cookie('token', users.token, { httpOnly: true, secure: true, sameSite: 'strict' });
    res.cookie('user', JSON.stringify({userId: users.userId, email: users.email}), { httpOnly: false, secure: true, sameSite: 'strict' });

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
export {
  login
}