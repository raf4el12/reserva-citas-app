import * as categoryUsecase from './category.usecase.js'

const getCategories = async (req, res) => {
  const categories = await categoryUsecase.getCategories()

  res.status(200).json(categories)
}

const getCategoryById = async (req, res) => {
  const { id } = req.params
  const category = await categoryUsecase.getCategoryById(id)
  if (!category) {
    return res.status(404).json({ message: 'Category not found' })
  }
  res.status(200).json(category)
}

const createdCategory = async (req, res) => {
  const { name, description } = req.body
  const category = await categoryUsecase.createdCategory({
    name,
    description,
  })
  res.status(201).json(category)
}

const updateCategory = async (req, res) => {
  const { id } = req.params
  const { name, description } = req.body
  const category = await categoryUsecase.updateCategoryById(id, {
    name,
    description,
  })
  if (!category) {
    return res.status(404).json({ message: 'Category not found' })
  }
  res.status(200).json(category)
}

const deleteCategory = async (req, res) => {
  const { id } = req.params
  const categoryId = await categoryUsecase.deleteCategoryById(id)
  if (!categoryId) {
    return res.status(404).json({ message: 'Category not found' })
  }
  res.status(200).json(categoryId)
}
export {
  getCategories,
  getCategoryById,
  createdCategory,
  updateCategory,
  deleteCategory,
}
