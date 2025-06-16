import * as patientsUseCase from './patients.usecase.js'

const getPatients = async (req, res) => {
  try {
    const patients = await patientsUseCase.getPatients()
    res.status(200).json(patients)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getPatientById = async (req, res) => {
  const { id } = req.params
  try {
    const patient = await patientsUseCase.getPatientById(id)
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' })
    }
    res.status(200).json(patient)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const updatePatient = async (req, res) => {
  const { id } = req.params
  const data = req.body
  try {
    const patient = await patientsUseCase.updatePatientById(id, data)
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' })
    }
    res.status(200).json(patient)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const createPatient = async (req, res) => {
  const data = req.body
  try {
    const patient = await patientsUseCase.createPatient(data)
    res.status(201).json(patient)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const deletePatient = async (req, res) => {
  const { id } = req.params
  try {
    const patient = await patientsUseCase.deletePatientById(id)
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' })
    }
    res.status(200).json({ message: 'Patient deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export {
  getPatients,
  getPatientById,
  updatePatient,
  createPatient,
  deletePatient,
}
