import * as categoryUsecase from './category.usecase.js'

const getCategories = async (req, res) => {
  try {
    const categories = await categoryUsecase.getCategories()
    res.status(200).json(categories)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getCategoryById = async (req, res) => {
  const { id } = req.params
  try {
    const category = await categoryUsecase.getCategoryById(id)
    if (!category) {
      return res.status(404).json({ message: 'Category not found' })
    }
    res.status(200).json(category)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const createdCategory = async (req, res) => {
  const { name, description } = req.body
  try {
    const category = await categoryUsecase.createdCategory({
      name,
      description,
    })
    res.status(201).json(category)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const updateCategory = async (req, res) => {
  const { id } = req.params
  const { name, description } = req.body
  try {
    const category = await categoryUsecase.updateCategoryById(id, {
      name,
      description,
    })
    if (!category) {
      return res.status(404).json({ message: 'Category not found' })
    }
    res.status(200).json(category)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const deleteCategory = async (req, res) => {
  const { id } = req.params
  try {
    const category = await categoryUsecase.deleteCategoryById(id)
    if (!category) {
      return res.status(404).json({ message: 'Category not found' })
    }
    res.status(200).json({ message: 'Category deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
export {
  getCategories,
  getCategoryById,
  createdCategory,
  updateCategory,
  deleteCategory,
}
