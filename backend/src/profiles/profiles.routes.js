import express from 'express'

import * as profileController from './profiles.controller.js'
const router = express.Router()

router.get('/', profileController.getProfiles.bind(profileController))
router.get('/:id', profileController.getProfilesById.bind(profileController))
router.post('/', profileController.createdProfiles.bind(profileController))
router.put('/:id', profileController.updateProfiles.bind(profileController))
router.delete('/:id', profileController.deleteProfiles.bind(profileController))
router.get(
  '/user/:userId',
  profileController.getProfilesByUserId.bind(profileController)
)

export default router
