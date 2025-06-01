import express from 'express';

import * as clinicalNotesController from './clinicalnotes.controller.js';

const router = express.Router();

router.get('/', clinicalNotesController.getClinicalNotes.bind(clinicalNotesController));
router.get('/:id', clinicalNotesController.getClinicalNoteById.bind(clinicalNotesController));
router.post('/', clinicalNotesController.createClinicalNote.bind(clinicalNotesController));
router.put('/:id', clinicalNotesController.updateClinicalNoteById.bind(clinicalNotesController));
router.delete('/:id', clinicalNotesController.deleteClinicalNoteById.bind(clinicalNotesController));

export default router;