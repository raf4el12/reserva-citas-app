import express from 'express'

import * as specialtyController from './specialties.controller.js'

const router = express.Router()

router.get('/', specialtyController.getSpecialties.bind(specialtyController))
router.get(
  '/:id',
  specialtyController.getSpecialtyById.bind(specialtyController)
)
router.post('/', specialtyController.createdSpecialty.bind(specialtyController))
router.put(
  '/:id',
  specialtyController.updateSpecialty.bind(specialtyController)
)
router.delete(
  '/:id',
  specialtyController.deleteSpecialty.bind(specialtyController)
)
router.get(
  '/category/:categoryId',
  specialtyController.getSpecialtiesByCateogryId.bind(specialtyController)
)

export default router
