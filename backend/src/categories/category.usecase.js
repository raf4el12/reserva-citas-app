import prisma from '../../prisma/context.js'

// filtrar cat con delet true, solo las categorias que han sido eliminadas (ejem)
const getCategories = async () => {
  try {
    const categories = await prisma.categories.findMany({
      // findMany es para obtener varios registros ejem: usuario, categorias, etc
      where: {
        deleted: false, // traer categorias que no esten eliminadas
      },
    })
    return categories
  } catch (error) {
    throw new Error('Error fetching categories: ' + error.message)
  }
}

// CRUD para obtener una categoria por id
const getCategoryById = async (id) => {
  try {
    const category = await prisma.categories.findUnique({
      // include: {
      //   specialties: {
      //     select: {
      //       id: true,
      //       name: true
      //     }
      //   }
      // },
      where: {
        id: Number.parseInt(id), // convertir el id a entero
      },
    })
    return category
  } catch (error) {
    throw new Error('Error fetching category: ' + error.message)
  }
}

// CRUD para actualizar una categoria por id
const updateCategoryById = async (id, data) => {
  try {
    const category = await prisma.categories.update({
      where: {
        id: Number.parseInt(id), // convertir el id a entero
      },
      data: data,
    })
    return category
  } catch (error) {
    throw new Error('Error updating category: ' + error.message)
  }
}

const createdCategory = async (data) => {
  try {
    const category = await prisma.categories.create({
      data: data,
    })
    return category
  } catch (error) {
    throw new Error('Error creating category: ' + error.message)
  }
}

// CRUD para eliminar una categoria por id
const deleteCategoryById = async (id) => {
  try {
    const category = await prisma.categories.update({
      where: {
        id: Number.parseInt(id), // convertir el id a entero
      },
      data: {
        deleted: true,
      },
    })
    return category
  } catch (error) {
    throw new Error('Error deleting category: ' + error.message)
  }
}

export {
  getCategories,
  getCategoryById,
  updateCategoryById,
  createdCategory,
  deleteCategoryById,
}
