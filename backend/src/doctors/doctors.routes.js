import express from 'express'
import * as doctorController from './doctors.controller.js'

const router = express.Router()
router.get('/', doctorController.getDoctors.bind(doctorController))
router.get('/:id', doctorController.getDoctorById.bind(doctorController))
router.post('/', doctorController.createdDoctor.bind(doctorController))
router.put('/:id', doctorController.updateDoctor.bind(doctorController))
router.delete('/:id', doctorController.deleteDoctor.bind(doctorController))

export default router
