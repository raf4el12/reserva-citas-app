import express from 'express';

import * as availabilityController from './availability.controller.js';
const router = express.Router();


router.get('/', availabilityController.getAvailability.bind(availabilityController));
router.get('/:id', availabilityController.getAvailabilityById.bind(availabilityController));
router.put('/:id', availabilityController.updateAvailabilityById.bind(availabilityController));
router.post('/', availabilityController.createdAvailability.bind(availabilityController));
router.delete('/:id', availabilityController.deleteAvailability.bind(availabilityController));

export default router;