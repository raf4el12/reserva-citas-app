import * as schedulesUseCase from './schedules.usecase.js'

const getSchedules = async (req, res) => {
  const schedules = await schedulesUseCase.getSchedules()
  res.status(200).json(schedules)
}

const getScheduleById = async (req, res) => {
  const schedule = await schedulesUseCase.getScheduleById(id)
  if (!schedule) {
    return res.status(404).json({ message: 'Schedule not found' })
  }
  res.status(200).json(schedule)
}

const updateScheduleById = async (req, res) => {
  const { id } = req.params
  const data = req.body
  const updatedSchedule = await schedulesUseCase.updateScheduleById(id, data)
  res.status(200).json(updatedSchedule)
}

const createdSchedule = async (req, res) => {
  const data = req.body
  const newSchedule = await schedulesUseCase.createdSchedule(data)
  res.status(201).json(newSchedule)
}

const deleteSchedule = async (req, res) => {
  const { id } = req.params
  const deletedSchedule = await schedulesUseCase.deleteSchedule(id)
  if (!deletedSchedule) {
    return res.status(404).json({ message: 'Schedule not found' })
  }
  res.status(200).json({ message: 'Schedule deleted successfully' })
}

export {
  getSchedules,
  getScheduleById,
  updateScheduleById,
  createdSchedule,
  deleteSchedule,
}
