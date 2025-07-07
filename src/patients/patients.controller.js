import * as patientsUseCase from './patients.usecase.js'

const getPatients = async (req, res) => {
  const patients = await patientsUseCase.getPatients()
  res.status(200).json(patients)
}

const getPatientById = async (req, res) => {
  const { id } = req.params
  const patient = await patientsUseCase.getPatientById(id)
  if (!patient) {
    return res.status(404).json({ message: 'Patient not found' })
  }
  res.status(200).json(patient)
}

const updatePatient = async (req, res) => {
  const { id } = req.params
  const data = req.body
  const patient = await patientsUseCase.updatePatientById(id, data)
  if (!patient) {
    return res.status(404).json({ message: 'Patient not found' })
  }
  res.status(200).json(patient)
}

const createPatient = async (req, res) => {
  const data = req.body
  const patient = await patientsUseCase.createPatient(data)
  res.status(201).json(patient)
}

const deletePatient = async (req, res) => {
  const { id } = req.params
  const patientId = await patientsUseCase.deletePatientById(id)
  if (!patientId) {
    return res.status(404).json({ message: 'Patient not found' })
  }
  res.status(200).json(patientId)
}

export {
  getPatients,
  getPatientById,
  updatePatient,
  createPatient,
  deletePatient,
}
