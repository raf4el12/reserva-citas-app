import bcrypt from 'bcrypt'
import prisma from '../../prisma/context.js'

const saltRounds = 10

const getUser = async () => {
  const users = await prisma.users.findMany({
    where: {
      deleted: false,
    },
  })

  return users
}

const getUserById = async (id) => {
  const user = await prisma.users.findUnique({
    where: {
      id: Number.parseInt(id),
    },
  })

  return user
}

const updateUserById = async (id, data) => {
  const user = await prisma.users.update({
    where: {
      id: Number.parseInt(id),
    },
    data: data,
  })

  return user
}

const createdUser = async (data) => {
  const { name, email, password, role } = data

  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = await prisma.users.create({
    data: {
      name: name,
      email: email,
      password: passwordHash,
      role: role,
    },
  })

  return user
}

const deleteUserById = async (id) => {
  const user = await prisma.users.update({
    where: {
      id: Number.parseInt(id),
    },
    data: {
      deleted: true,
    },
  })

  return user
}

export { getUser, getUserById, updateUserById, createdUser, deleteUserById }
