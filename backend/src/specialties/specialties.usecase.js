import prisma from '../../prisma/context.js'

const getSpecialties = async () => {
  try {
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
  } catch (error) {
    throw new Error('Error fetching specialties: ' + error.message)
  }
}

const getSpecialtyById = async (id) => {
  try {
    const specialty = await prisma.specialties.findUnique({
      where: {
        id: Number.parseInt(id), // convertir el id a entero
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
  } catch (error) {
    throw new Error('Error fetching specialty: ' + error.message)
  }
}

const updateSpecialtyById = async (id, data) => {
  try {
    const specialty = await prisma.specialties.update({
      where: {
        id: Number.parseInt(id), // convertir el id a entero
      },
      data: data,
    })
    return specialty
  } catch (error) {
    throw new Error('Error updating specialty: ' + error.message)
  }
}

const createdSpecialty = async (data) => {
  try {
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
  } catch (error) {
    throw new Error('Error creating specialty: ' + error.message)
  }
}

const deleteSpecialtyById = async (id) => {
  try {
    const specialty = await prisma.specialties.update({
      where: {
        id: Number.parseInt(id), // convertir el id a entero
      },
      data: {
        deleted: true,
      },
    })
    return specialty
  } catch (error) {
    throw new Error('Error deleting specialty: ' + error.message)
  }
}

const getSpecialtiesByCateogryId = async (categoryId) => {
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
  getSpecialtiesByCateogryId,
}
