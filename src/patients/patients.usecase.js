import prisma from '../../prisma/context.js'

const getPatients = async () => {
  const patients = await prisma.patients.findMany({
    where: {
      deleted: false,
    },
    include: {
      profile: true,
    },
  })

  return patients
}

const getPatientById = async (id) => {
  const patient = await prisma.patients.findUnique({
    where: {
      id: Number.parseInt(id),
    },
    include: {
      profile: true,
    },
  })

  return patient
}

const updatePatientById = async (id, data) => {
  const patient = await prisma.patients.update({
    where: {
      id: Number.parseInt(id),
    },
    data: data,
    include: {
      profile: true,
    },
  })

  return patient
}

const createPatient = async (data) => {
  const {
    profileId,
    emergencyContact,
    bloodType,
    allergies,
    chronic_conditions,
  } = data

  const patient = await prisma.patients.create({
    data: {
      profileId,
      emergencyContact,
      bloodType,
      allergies,
      chronic_conditions,
    },
    include: {
      profile: true, // Incluye datos relacionados del perfil
    },
  })

  return patient
}

const deletePatientById = async (id) => {
  const patient = await prisma.patients.update({
    where: {
      id: Number.parseInt(id),
    },
    data: {
      deleted: true,
    },
    include: {
      profile: true,
    },
  })

  return patient
}

export {
  getPatients,
  getPatientById,
  updatePatientById,
  createPatient,
  deletePatientById,
}
