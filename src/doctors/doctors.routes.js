import express from 'express'
import { uploadSingle } from '../middlewares/upload.js'
import * as doctorController from './doctors.controller.js'

const router = express.Router()
router.get('/', doctorController.getDoctors.bind(doctorController))
router.get('/:id', doctorController.getDoctorById.bind(doctorController))
router.post(
  '/',
  uploadSingle('photo'),
  doctorController.createdDoctor.bind(doctorController)
)
router.put(
  '/:id',
  uploadSingle('photo'),
  doctorController.updateDoctor.bind(doctorController)
)
router.delete('/:id', doctorController.deleteDoctor.bind(doctorController))

export default router
