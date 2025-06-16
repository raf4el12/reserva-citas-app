import express from 'express'
import * as doctorsSpecialtiesController from './doctorsSpecialties.controller.js'

const router = express.Router()

router.get(
  '/',
  doctorsSpecialtiesController.getDoctorsSpecialties.bind(
    doctorsSpecialtiesController
  )
)
router.get(
  '/:id',
  doctorsSpecialtiesController.getDoctorsSpecialtyById.bind(
    doctorsSpecialtiesController
  )
)
router.post(
  '/',
  doctorsSpecialtiesController.createDoctorsSpecialty.bind(
    doctorsSpecialtiesController
  )
)
router.put(
  '/:id',
  doctorsSpecialtiesController.updateDoctorsSpecialty.bind(
    doctorsSpecialtiesController
  )
)
router.delete(
  '/:id',
  doctorsSpecialtiesController.deleteDoctorsSpecialty.bind(
    doctorsSpecialtiesController
  )
)

export default router
