import express from 'express'

import * as categoryController from './category.controller.js'

const router = express.Router()

router.get('/', categoryController.getCategories.bind(categoryController))
router.get('/:id', categoryController.getCategoryById.bind(categoryController))
router.post('/', categoryController.createdCategory.bind(categoryController))
router.put('/:id', categoryController.updateCategory.bind(categoryController))
router.delete(
  '/:id',
  categoryController.deleteCategory.bind(categoryController)
)

export default router
