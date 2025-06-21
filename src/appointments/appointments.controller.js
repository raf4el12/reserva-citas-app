import * as appointmentsUseCase from './appointments.usecase.js'

const getAppointments = async (req, res) => {
  const appointments = await appointmentsUseCase.getAppointments()
  res.status(200).json(appointments)
}

const getAppointmentById = async (req, res) => {
  const appointment = await appointmentsUseCase.getAppointmentById(id)
  if (!appointment) {
    return res.status(404).json({ error: 'Appointment not found' })
  }
  res.status(200).json(appointment)
}

const createAppointment = async (req, res) => {
  const appointment = await appointmentsUseCase.createAppointment(data)
  res.status(201).json(appointment)
}

const updateAppointmentById = async (req, res) => {
  const { id } = req.params
  const data = req.body
  const appointment = await appointmentsUseCase.updateAppointmentById(id, data)
  res.status(200).json(appointment)
}

const deleteAppointmentById = async (req, res) => {
  const { id } = req.params
  const appointment = await appointmentsUseCase.deleteAppointmentById(id)
  res.status(200).json(appointment)
}

export {
  getAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointmentById,
  deleteAppointmentById,
}
