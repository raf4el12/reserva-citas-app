import express from 'express'
import { uploadSingle } from '../middlewares/upload.js'
import * as patientsController from './patients.controller.js'

const router = express.Router()

router.get('/', patientsController.getPatients.bind(patientsController))
router.get('/:id', patientsController.getPatientById.bind(patientsController))
router.post(
  '/',
  uploadSingle('photo'),
  patientsController.createPatient.bind(patientsController)
)
router.put(
  '/:id',
  uploadSingle('photo'),
  patientsController.updatePatient.bind(patientsController)
)
router.delete('/:id', patientsController.deletePatient.bind(patientsController))

export default router
