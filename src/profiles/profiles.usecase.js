import prisma from '../../prisma/context.js'

const getProfiles = async () => {
  const profiles = await prisma.profiles.findMany({
    where: {
      deleted: false,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  })

  return profiles
}

const getProfilesById = async (id) => {
  const profiles = await prisma.profiles.findUnique({
    where: {
      id: Number.parseInt(id),
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  })

  return profiles
}

const updateProfilesById = async (id, data) => {
  const profiles = await prisma.profiles.update({
    where: {
      id: Number.parseInt(id),
    },
    data: data,
  })

  return profiles
}

const createdProfiles = async ({
  name,
  lastName,
  email,
  birthday,
  gender,
  national,
  photo,
  phone,
  address,
  typeProfileId,
  typeDocument,
  numberDocument,
  userId,
}) => {
  if (userId) {
    const existingProfile = await prisma.profiles.findFirst({
      where: { userId },
    })

    if (existingProfile) {
      throw new Error('Profile already exists for this user')
    }
  }

  const profile = await prisma.profiles.create({
    data: {
      name,
      lastName,
      email,
      birthday: birthday ? new Date(birthday) : null,
      gender,
      national,
      photo,
      phone,
      address,
      typeProfileId,
      typeDocument,
      numberDocument,
      userId,
    },
  })

  return profile
}

const deleteProfilesById = async (id) => {
  const profiles = await prisma.profiles.update({
    where: {
      id: Number.parseInt(id),
    },
    data: {
      deleted: true,
    },
  })

  return profiles
}

const getProfilesByUserId = async (userId) => {
  return await prisma.profiles.findMany({
    include: {
      user: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    where: {
      userId: Number.parseInt(userId),
      deleted: false,
    },
  })
}

export {
  getProfiles,
  getProfilesById,
  updateProfilesById,
  createdProfiles,
  deleteProfilesById,
  getProfilesByUserId,
}
