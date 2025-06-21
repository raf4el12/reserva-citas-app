import * as userUseCase from './user.usecase.js'

const getUsers = async (req, res) => {
  const users = await userUseCase.getUser()
  res.status(200).json(users)
}

const getUserById = async (req, res) => {
  const { id } = req.params
  const user = await userUseCase.getUserById(id)
  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }
  res.status(200).json(user)
}

const createdUser = async (req, res) => {
  const { name, email, password, role } = req.body
  const user = await userUseCase.createdUser({ name, email, password, role })
  res.status(201).json(user)
}

const updateUser = async (req, res) => {
  const { id } = req.params
  const { name, email, password, role } = req.body
  const user = await userUseCase.updateUserById(id, {
    name,
    email,
    password,
    role,
  })
  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }
  res.status(200).json(user)
}

const deleteUser = async (req, res) => {
  const { id } = req.params
  const user = await userUseCase.deleteUserById(id)
  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }
  res.status(200).json({ message: 'User deleted successfully' })
}

export { getUsers, getUserById, createdUser, updateUser, deleteUser }
