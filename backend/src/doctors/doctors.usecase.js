import prisma from '../../prisma/context.js'

const getDoctors = async () => {
  try {
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
  } catch (error) {
    throw new Error('Error fetching doctors: ' + error.message)
  }
}

const getDoctorById = async (id) => {
  try {
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
  } catch (error) {
    throw new Error('Error fetching doctor: ' + error.message)
  }
}

const updateDoctorById = async (id, data) => {
  try {
    const doctor = await prisma.doctors.update({
      where: {
        id: Number.parseInt(id), // convertir el id a entero
      },
      data: data,
    })
    return doctor
  } catch (error) {
    throw new Error('Error updating doctor: ' + error.message)
  }
}

const createdDoctor = async (data) => {
  try {
    const { profileId, licenseNumber, resume } = data

    const doctor = await prisma.doctors.create({
      data: {
        profileId,
        licenseNumber,
        resume,
      },
    })
    return doctor
  } catch (error) {
    throw new Error('Error creating doctor: ' + error.message)
  }
}

const deleteDoctorById = async (id) => {
  try {
    const doctor = await prisma.doctors.update({
      where: {
        id: Number.parseInt(id), // convertir el id a entero
      },
      data: {
        deleted: true,
      },
    })
    return doctor
  } catch (error) {
    throw new Error('Error deleting doctor: ' + error.message)
  }
}

export {
  getDoctors,
  getDoctorById,
  updateDoctorById,
  createdDoctor,
  deleteDoctorById,
}
