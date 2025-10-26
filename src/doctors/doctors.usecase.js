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
          email: true,
          phone: true,
          photo: true,
        },
      },
      specialties: {
        where: {
          specialty: {
            deleted: false,
            isActive: true,
          },
        },
        select: {
          id: true,
          specialty: {
            select: {
              id: true,
              name: true,
              description: true,
              icon: true,
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
          birthDate: true,
          address: true,
        },
      },
      specialties: {
        where: {
          specialty: {
            deleted: false,
          },
        },
        select: {
          id: true,
          specialty: {
            select: {
              id: true,
              name: true,
              description: true,
              duration: true,
              price: true,
              icon: true,
            },
          },
        },
      },
    },
  })

  if (!doctor) {
    throw new Error('Doctor no encontrado')
  }

  return doctor
}

const updateDoctorById = async (id, data) => {
  const { licenseNumber, resume, specialtyIds, ...profileData } = data

  const existingDoctor = await prisma.doctors.findUnique({
    where: { id: Number.parseInt(id), deleted: false },
  })

  if (!existingDoctor) {
    throw new Error('Doctor no encontrado')
  }

  const doctor = await prisma.$transaction(async (tx) => {
    if (Object.keys(profileData).length > 0) {
      await tx.profiles.update({
        where: { id: existingDoctor.profileId },
        data: {
          ...profileData,
          updatedAt: new Date(),
        },
      })
    }

    if (Array.isArray(specialtyIds)) {
      await tx.doctorsSpecialties.deleteMany({
        where: { doctorId: existingDoctor.id },
      })

      if (specialtyIds.length > 0) {
        await tx.doctorsSpecialties.createMany({
          data: specialtyIds.map((specialtyId) => ({
            doctorId: existingDoctor.id,
            specialtyId: Number.parseInt(specialtyId),
          })),
        })
      }
    }

    return await tx.doctors.update({
      where: { id: existingDoctor.id },
      data: {
        licenseNumber,
        resume,
        updatedAt: new Date(),
      },
      include: {
        profile: true,
        specialties: {
          include: {
            specialty: true,
          },
        },
      },
    })
  })

  return doctor
}

const createdDoctor = async (data) => {
  const {
    userId,
    name,
    lastName,
    email,
    phone,
    birthDate,
    gender,
    address,
    photo,
    licenseNumber,
    resume,
    specialtyIds = [],
  } = data

  if (userId) {
    const user = await prisma.users.findUnique({
      where: { id: Number.parseInt(userId), deleted: false },
    })

    if (!user) {
      throw new Error('Usuario no encontrado')
    }
  }

  if (specialtyIds.length > 0) {
    const specialties = await prisma.specialties.findMany({
      where: {
        id: { in: specialtyIds.map((id) => Number.parseInt(id)) },
        deleted: false,
        isActive: true,
      },
    })

    if (specialties.length !== specialtyIds.length) {
      throw new Error('Una o más especialidades no son válidas')
    }
  }

  const doctor = await prisma.$transaction(async (tx) => {
    const profile = await tx.profiles.create({
      data: {
        userId: userId ? Number.parseInt(userId) : undefined,
        name,
        lastName,
        email,
        phone: phone || undefined,
        birthDate: birthDate ? new Date(birthDate) : undefined,
        gender: gender || undefined,
        address: address || undefined,
        photo: photo || undefined,
      },
    })

    const newDoctor = await tx.doctors.create({
      data: {
        profileId: profile.id,
        licenseNumber,
        resume: resume || undefined,
        specialties: {
          createMany: {
            data: specialtyIds.map((specialtyId) => ({
              specialtyId: Number.parseInt(specialtyId),
            })),
          },
        },
      },
      include: {
        profile: true,
        specialties: {
          include: {
            specialty: true,
          },
        },
      },
    })

    return newDoctor
  })

  return doctor
}

const deleteDoctorById = async (id) => {
  const doctor = await prisma.doctors.update({
    where: {
      id: Number.parseInt(id),
      deleted: false,
    },
    data: {
      deleted: true,
      updatedAt: new Date(),
    },
  })

  return doctor
}

export {
  getDoctors,
  getDoctorById,
  updateDoctorById,
  createdDoctor,
  deleteDoctorById,
}
