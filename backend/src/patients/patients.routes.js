import exppress from 'express';
import * as patientsController from './patients.controller.js';

const router = exppress.Router();

router.get('/', patientsController.getPatients.bind(patientsController));
router.get('/:id', patientsController.getPatientById.bind(patientsController));
router.post('/', patientsController.createPatient.bind(patientsController));
router.put('/:id', patientsController.updatePatient.bind(patientsController));
router.delete('/:id', patientsController.deletePatient.bind(patientsController));

export default router;
