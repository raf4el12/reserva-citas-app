import * as appointmentsUseCase from './appointments.usecase.js'

const getAppointments = async (req, res) => {
  try {
    const appointments = await appointmentsUseCase.getAppointments()
    res.status(200).json(appointments)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getAppointmentById = async (req, res) => {
  const { id } = req.params
  try {
    const appointment = await appointmentsUseCase.getAppointmentById(id)
    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' })
    }
    res.status(200).json(appointment)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const createAppointment = async (req, res) => {
  const data = req.body
  try {
    const appointment = await appointmentsUseCase.createAppointment(data)
    res.status(201).json(appointment)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const updateAppointmentById = async (req, res) => {
  const { id } = req.params
  const data = req.body
  try {
    const appointment = await appointmentsUseCase.updateAppointmentById(
      id,
      data
    )
    res.status(200).json(appointment)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const deleteAppointmentById = async (req, res) => {
  const { id } = req.params
  try {
    const appointment = await appointmentsUseCase.deleteAppointmentById(id)
    res.status(200).json(appointment)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export {
  getAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointmentById,
  deleteAppointmentById,
}
