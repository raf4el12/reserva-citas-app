import bcrypt from 'bcrypt'
import { omit } from 'es-toolkit'

import prisma from '../../prisma/context.js'
import { UserRole } from '../../prisma/generated/client/index.js'

const saltRounds = 10
const omitFields = ['password', 'validateEmail']

const allowedRoles = new Set(Object.values(UserRole))

const sanitizeUser = (user) => (user ? omit(user, omitFields) : null)

const buildRole = (role) => {
  if (role === undefined || role === null) {
    return undefined
  }

  const normalizedRole =
    typeof role === 'string' ? role.trim().toUpperCase() : role

  if (!allowedRoles.has(normalizedRole)) throw new Error('Role not found')

  return normalizedRole
}

const getUser = async () => {
  const users = await prisma.users.findMany({
    where: {
      deleted: false,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return users.map((user) => sanitizeUser(user))
}

const getUserById = async (id) => {
  const user = await prisma.users.findFirst({
    where: {
      id: Number.parseInt(id, 10),
      deleted: false,
    },
  })

  return sanitizeUser(user)
}

const updateUserById = async (id, data) => {
  const { password, role, ...rest } = data

  const updatePayload = {
    ...rest,
  }

  if (password) {
    updatePayload.password = await bcrypt.hash(password, saltRounds)
  }

  const resolvedRole = buildRole(role)
  if (resolvedRole) {
    updatePayload.role = resolvedRole
  }

  updatePayload.updatedAt = new Date()

  const user = await prisma.users.update({
    where: {
      id: Number.parseInt(id, 10),
    },
    data: updatePayload,
  })

  return sanitizeUser(user)
}

const createdUser = async (data) => {
  const {
    name,
    email,
    password,
    role = UserRole.USER,
    photo,
    validateEmail,
  } = data

  const resolvedRole = buildRole(role) ?? UserRole.USER

  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = await prisma.users.create({
    data: {
      name,
      email,
      password: passwordHash,
      role: resolvedRole,
      ...(photo ? { photo } : {}),
      ...(typeof validateEmail === 'boolean' ? { validateEmail } : {}),
    },
  })

  return sanitizeUser(user)
}

const deleteUserById = async (id) => {
  const user = await prisma.users.update({
    where: {
      id: Number.parseInt(id, 10),
    },
    data: {
      deleted: true,
      updatedAt: new Date(),
    },
  })

  return sanitizeUser(user)
}

export { getUser, getUserById, updateUserById, createdUser, deleteUserById }
