import express from 'express';
import * as appointmentsController from './appointments.controller.js';

const router = express.Router();

router.get('/', appointmentsController.getAppointments.bind(appointmentsController));
router.get('/:id', appointmentsController.getAppointmentById.bind(appointmentsController));
router.post('/', appointmentsController.createAppointment.bind(appointmentsController));
router.put('/:id', appointmentsController.updateAppointmentById.bind(appointmentsController));
router.delete('/:id', appointmentsController.deleteAppointmentById.bind(appointmentsController));

export default router;

