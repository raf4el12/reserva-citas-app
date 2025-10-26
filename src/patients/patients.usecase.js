import prisma from '../../prisma/context.js'

const getPatients = async () => {
  const patients = await prisma.patients.findMany({
    where: {
      deleted: false,
    },
    include: {
      profile: {
        select: {
          id: true,
          name: true,
          lastName: true,
          email: true,
          phone: true,
          photo: true,
          birthday: true,
          gender: true,
          address: true,
          typeDocument: true,
          numberDocument: true,
        },
      },
    },
  })

  return patients
}

const getPatientById = async (id) => {
  const patient = await prisma.patients.findUnique({
    where: {
      id: Number.parseInt(id),
      deleted: false,
    },
    include: {
      profile: {
        select: {
          id: true,
          name: true,
          lastName: true,
          email: true,
          phone: true,
          photo: true,
          birthday: true,
          gender: true,
          address: true,
          national: true,
          typeDocument: true,
          numberDocument: true,
        },
      },
    },
  })

  if (!patient) {
    throw new Error('Paciente no encontrado')
  }

  return patient
}

const updatePatientById = async (id, data) => {
  const {
    emergencyContact,
    bloodType,
    allergies,
    chronic_conditions,
    ...profileData
  } = data

  const existingPatient = await prisma.patients.findUnique({
    where: { id: Number.parseInt(id), deleted: false },
  })

  if (!existingPatient) {
    throw new Error('Paciente no encontrado')
  }

  const patient = await prisma.$transaction(async (tx) => {
    if (Object.keys(profileData).length > 0) {
      await tx.profiles.update({
        where: { id: existingPatient.profileId },
        data: {
          ...profileData,
          updatedAt: new Date(),
        },
      })
    }

    return await tx.patients.update({
      where: { id: existingPatient.id },
      data: {
        emergencyContact,
        bloodType,
        allergies,
        chronic_conditions,
        updatedAt: new Date(),
      },
      include: {
        profile: true,
      },
    })
  })

  return patient
}

const createPatient = async (data) => {
  const {
    profileId,
    userId,
    name,
    lastName,
    email,
    phone,
    birthday,
    gender,
    address,
    national,
    photo,
    typeDocument,
    numberDocument,
    emergencyContact,
    bloodType,
    allergies,
    chronic_conditions,
  } = data

  if (userId) {
    const user = await prisma.users.findUnique({
      where: { id: Number.parseInt(userId), deleted: false },
    })

    if (!user) {
      throw new Error('Usuario no encontrado')
    }
  }

  const patient = await prisma.$transaction(async (tx) => {
    let profile

    if (profileId) {
      profile = await tx.profiles.findUnique({
        where: { id: Number.parseInt(profileId), deleted: false },
      })

      if (!profile) {
        throw new Error('Perfil no encontrado')
      }
    } else {
      if (!name || !lastName || !email) {
        throw new Error(
          'Los campos name, lastName y email son requeridos para crear un nuevo perfil'
        )
      }

      profile = await tx.profiles.create({
        data: {
          userId: userId ? Number.parseInt(userId) : undefined,
          name,
          lastName,
          email,
          phone: phone || undefined,
          birthday: birthday ? new Date(birthday) : undefined,
          gender: gender || undefined,
          address: address || undefined,
          national: national || undefined,
          photo: photo || undefined,
          typeDocument: typeDocument || undefined,
          numberDocument: numberDocument || undefined,
        },
      })
    }

    const newPatient = await tx.patients.create({
      data: {
        profileId: profile.id,
        emergencyContact,
        bloodType,
        allergies: allergies || undefined,
        chronic_conditions: chronic_conditions || undefined,
      },
      include: {
        profile: true,
      },
    })

    return newPatient
  })

  return patient
}

const deletePatientById = async (id) => {
  const patient = await prisma.patients.update({
    where: {
      id: Number.parseInt(id),
      deleted: false,
    },
    data: {
      deleted: true,
      updatedAt: new Date(),
    },
  })

  return patient.id
}

export {
  getPatients,
  getPatientById,
  updatePatientById,
  createPatient,
  deletePatientById,
}
