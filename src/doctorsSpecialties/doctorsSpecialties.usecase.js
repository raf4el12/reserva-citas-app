import prisma from '../../prisma/context.js'

const getDoctorsSpecialties = async () => {
  const doctorsSpecialties = await prisma.doctorsSpecialties.findMany({
    include: {
      doctor: true,
      specialty: true,
    },
  })

  return doctorsSpecialties
}

const getDoctorsSpecialtyById = async (id) => {
  const doctorsSpecialty = await prisma.doctorsSpecialties.findUnique({
    where: { id },
    include: {
      doctor: true,
      specialty: true,
    },
  })

  if (!doctorsSpecialty) {
    throw new Error(`Doctors specialty with ID ${id} not found`)
  }

  return doctorsSpecialty
}

const createDoctorsSpecialty = async ({ doctorId, specialtyId }) => {
  const doctorsSpecialty = await prisma.doctorsSpecialties.create({
    data: {
      doctorId,
      specialtyId,
    },
    include: {
      doctor: true,
      specialty: true,
    },
  })

  return doctorsSpecialty
}

const updateCategoryById = async (id, { doctorId, specialtyId }) => {
  const doctorsSpecialty = await prisma.doctorsSpecialties.update({
    where: { id },
    data: {
      doctorId,
      specialtyId,
    },
    include: {
      doctor: true,
      specialty: true,
    },
  })

  return doctorsSpecialty
}

const deleteCategoryById = async (id) => {
  const doctorsSpecialty = await prisma.doctorsSpecialties.delete({
    where: { id },
  })

  return doctorsSpecialty.id
}

export {
  getDoctorsSpecialties,
  getDoctorsSpecialtyById,
  createDoctorsSpecialty,
  updateCategoryById,
  deleteCategoryById,
}
