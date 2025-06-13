import * as authUserCase from './auth.usecase.js';

const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const users = await authUserCase.login(email, password);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


export {
  login
}