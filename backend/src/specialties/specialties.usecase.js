import prisma from '../../prisma/context.js'

const getSpecialties = async () => {
  const specialties = await prisma.specialties.findMany({
    where: {
      deleted: false,
    },
    include: {
      category: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  })

  return specialties
}

const getSpecialtyById = async (id) => {
  const specialty = await prisma.specialties.findUnique({
    where: {
      id: Number.parseInt(id),
    },
    include: {
      category: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  })

  return specialty
}

const updateSpecialtyById = async (id, data) => {
  const specialty = await prisma.specialties.update({
    where: {
      id: Number.parseInt(id),
    },
    data: data,
  })

  return specialty
}

const createdSpecialty = async (data) => {
  const { name, categoryId } = data

  const specialty = await prisma.specialties.create({
    data: {
      name,
      category: {
        connect: {
          id: categoryId,
        },
      },
    },
  })

  return getSpecialtyById(specialty.id)
}

const deleteSpecialtyById = async (id) => {
  const specialty = await prisma.specialties.update({
    where: {
      id: Number.parseInt(id),
    },
    data: {
      deleted: true,
    },
  })

  return specialty
}

const getSpecialtiesByCategoryId = async (categoryId) => {
  return prisma.specialties.findMany({
    include: {
      category: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    where: {
      categoryId: Number.parseInt(categoryId),
    },
  })
}

export {
  getSpecialties,
  getSpecialtyById,
  updateSpecialtyById,
  createdSpecialty,
  deleteSpecialtyById,
  getSpecialtiesByCategoryId,
}
