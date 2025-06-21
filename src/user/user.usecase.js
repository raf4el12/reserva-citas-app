import bcrypt from 'bcrypt'
import { omit } from 'es-toolkit'

import prisma from '../../prisma/context.js'

const saltRounds = 10
const omitFields = ['password', 'validateEmail']

const getUser = async () => {
  const users = await prisma.users.findMany({
    where: {
      deleted: false,
    },
  })

  const newUsers = users.map((user) => omit(user, omitFields))

  return newUsers
}

const getUserById = async (id) => {
  const user = await prisma.users.findUnique({
    where: {
      id: Number.parseInt(id),
    },
  })

  return omit(user, omitFields)
}

const updateUserById = async (id, data) => {
  const user = await prisma.users.update({
    where: {
      id: Number.parseInt(id),
    },
    data: data,
  })

  return omit(user, omitFields)
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

  return omit(user, omitFields)
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

  return omit(user, omitFields)
}

export { getUser, getUserById, updateUserById, createdUser, deleteUserById }
