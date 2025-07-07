import * as doctorsUseCase from './doctors.usecase.js'

const getDoctors = async (req, res) => {
  const doctors = await doctorsUseCase.getDoctors()
  res.status(200).json(doctors)
}

const getDoctorById = async (req, res) => {
  const { id } = req.params
  const doctor = await doctorsUseCase.getDoctorById(id)
  if (!doctor) {
    return res.status(404).json({ message: 'Doctor not found' })
  }
  res.status(200).json(doctor)
}

const createdDoctor = async (req, res) => {
  const { profileId, licenseNumber, resume } = req.body
  const doctor = await doctorsUseCase.createdDoctor({
    profileId,
    licenseNumber,
    resume,
  })
  res.status(201).json(doctor)
}

const updateDoctor = async (req, res) => {
  const { id } = req.params
  const { profileId, licenseNumber, resume } = req.body
  const doctor = await doctorsUseCase.updateDoctorById(id, {
    profileId,
    licenseNumber,
    resume,
  })
  if (!doctor) {
    return res.status(404).json({ message: 'Doctor not found' })
  }
  res.status(200).json(doctor)
}

const deleteDoctor = async (req, res) => {
  const { id } = req.params
  const doctorId = await doctorsUseCase.deleteDoctorById(Number.parseInt(id))
  if (!doctorId) {
    return res.status(404).json({ message: 'Doctor not found' })
  }

  res.status(200).json(doctorId)
}

export { getDoctors, getDoctorById, createdDoctor, updateDoctor, deleteDoctor }
