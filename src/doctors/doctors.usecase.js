import prisma from '../../prisma/context.js'

const getDoctors = async () => {
  const doctors = await prisma.doctors.findMany({
    where: {
      deleted: false,
    },
    include: {
      profile: {
        select: {
          id: true,
          name: true,
          lastName: true,
        },
      },
      specialties: {
        select: {
          id: true,
          specialty: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  })

  return doctors
}

const getDoctorById = async (id) => {
  const doctor = await prisma.doctors.findUnique({
    where: {
      id: Number.parseInt(id), // convertir el id a entero
    },
    include: {
      profile: {
        select: {
          id: true,
          name: true,
          lastName: true,
        },
      },
      specialties: {
        select: {
          id: true,
          specialty: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  })

  return doctor
}

const updateDoctorById = async (id, data) => {
  const doctor = await prisma.doctors.update({
    where: {
      id: Number.parseInt(id), // convertir el id a entero
    },
    data: data,
  })

  return doctor
}

const createdDoctor = async (data) => {
  const { profileId, licenseNumber, resume } = data

  const doctor = await prisma.doctors.create({
    data: {
      profileId,
      licenseNumber,
      resume,
    },
  })

  return doctor
}

const deleteDoctorById = async (id) => {
  const doctor = await prisma.doctors.update({
    where: {
      id: Number.parseInt(id), // convertir el id a entero
    },
    data: {
      deleted: true,
    },
  })

  return doctor.id
}

export {
  getDoctors,
  getDoctorById,
  updateDoctorById,
  createdDoctor,
  deleteDoctorById,
}
