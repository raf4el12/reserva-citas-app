import express from 'express';
import * as ClinicalNotesController from './ClinicalNotes.controller.js';

const router = express.Router();

router.get('/', ClinicalNotesController.getClinicalNotes.bind(ClinicalNotesController));
router.get('/:id', ClinicalNotesController.getClinicalNotesById.bind(ClinicalNotesController));
router.post('/', ClinicalNotesController.createClinicalNotes.bind(ClinicalNotesController));
router.put('/:id', ClinicalNotesController.updateClinicalNotesById.bind(ClinicalNotesController));
router.delete('/:id', ClinicalNotesController.deleteClinicalNotesById.bind(ClinicalNotesController));

export default router;

