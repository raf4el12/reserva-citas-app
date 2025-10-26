import * as patientsUseCase from './patients.usecase.js'

const getPatients = async (req, res) => {
  try {
    const patients = await patientsUseCase.getPatients()
    res.status(200).json(patients)
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error interno del servidor', error: error.message })
  }
}

const getPatientById = async (req, res) => {
  try {
    const { id } = req.params
    const patient = await patientsUseCase.getPatientById(id)
    res.status(200).json(patient)
  } catch (error) {
    if (error.message === 'Paciente no encontrado') {
      return res.status(404).json({ message: error.message })
    }
    res
      .status(500)
      .json({ message: 'Error interno del servidor', error: error.message })
  }
}

const updatePatient = async (req, res) => {
  try {
    const { id } = req.params
    const data = { ...req.body }

    if (req.file) {
      data.photo = `/uploads/${req.file.filename}`
    }

    const patient = await patientsUseCase.updatePatientById(id, data)

    res.status(200).json({
      message: 'Paciente actualizado exitosamente',
      data: patient,
    })
  } catch (error) {
    if (error.message === 'Paciente no encontrado') {
      return res.status(404).json({ message: error.message })
    }
    res.status(500).json({
      message: error.message || 'Error al actualizar paciente',
      status: 500,
    })
  }
}

const createPatient = async (req, res) => {
  try {
    const data = { ...req.body }

    if (req.file) {
      data.photo = `/uploads/${req.file.filename}`
    }

    const patient = await patientsUseCase.createPatient(data)

    res.status(201).json({
      message: 'Paciente creado exitosamente',
      data: patient,
    })
  } catch (error) {
    if (error.message === 'Usuario no encontrado') {
      return res.status(404).json({ message: error.message })
    }
    res.status(500).json({
      message: error.message || 'Error al crear paciente',
      status: 500,
    })
  }
}

const deletePatient = async (req, res) => {
  try {
    const { id } = req.params
    const patientId = await patientsUseCase.deletePatientById(id)
    res
      .status(200)
      .json({ message: 'Paciente eliminado correctamente', id: patientId })
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error interno del servidor', error: error.message })
  }
}

export {
  getPatients,
  getPatientById,
  updatePatient,
  createPatient,
  deletePatient,
}
