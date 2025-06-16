import prisma from '../../prisma/context.js'

const getCategories = async () => {
  const categories = await prisma.categories.findMany({
    where: {
      deleted: false,
    },
  })
  return categories
}

const getCategoryById = async (id) => {
  const category = await prisma.categories.findUnique({
    where: {
      id: Number.parseInt(id),
    },
  })
  return category
}

const updateCategoryById = async (id, data) => {
  const category = await prisma.categories.update({
    where: {
      id: Number.parseInt(id),
    },
    data: data,
  })
  return category
}

const createdCategory = async (data) => {
  const category = await prisma.categories.create({
    data: data,
  })
  return category
}

const deleteCategoryById = async (id) => {
  const category = await prisma.categories.update({
    where: {
      id: Number.parseInt(id),
    },
    data: {
      deleted: true,
    },
  })
  return category
}

export {
  getCategories,
  getCategoryById,
  updateCategoryById,
  createdCategory,
  deleteCategoryById,
}
