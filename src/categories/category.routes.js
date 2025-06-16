import express from 'express'

import { authBearer } from '../middlewares/auth.js'
import * as categoryController from './category.controller.js'

const router = express.Router()

router.get(
  '/',
  authBearer,
  categoryController.getCategories.bind(categoryController)
)
router.get(
  '/:id',
  authBearer,
  categoryController.getCategoryById.bind(categoryController)
)
router.post(
  '/',
  authBearer,
  categoryController.createdCategory.bind(categoryController)
)
router.put(
  '/:id',
  authBearer,
  categoryController.updateCategory.bind(categoryController)
)
router.delete(
  '/:id',
  authBearer,
  categoryController.deleteCategory.bind(categoryController)
)

export default router
