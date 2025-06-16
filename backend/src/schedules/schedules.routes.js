import express from 'express'
import * as schedulesController from './schedules.controller.js'
const router = express.Router()

router.get('/', schedulesController.getSchedules.bind(schedulesController))
router.get(
  '/:id',
  schedulesController.getScheduleById.bind(schedulesController)
)
router.put(
  '/:id',
  schedulesController.updateScheduleById.bind(schedulesController)
)
router.post('/', schedulesController.createdSchedule.bind(schedulesController))
router.delete(
  '/:id',
  schedulesController.deleteSchedule.bind(schedulesController)
)
export default router
