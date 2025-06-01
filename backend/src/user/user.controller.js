import * as userUseCase from './user.usecase.js';

const getUsers = async (req, res) => {
  try {
    const users = await userUseCase.getUser();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userUseCase.getUserById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const createdUser = async (req, res) => {
  const { name, email, password,role } = req.body;
  try {
    const user = await userUseCase.createdUser({ name, email, password,role });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}   

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password,role } = req.body;
  try {
    const user = await userUseCase.updateUserById(id, { name, email, password,role });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userUseCase.deleteUserById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export {
  getUsers,
  getUserById,
  createdUser,
  updateUser,
  deleteUser
}