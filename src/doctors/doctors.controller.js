import * as doctorsUseCase from './doctors.usecase.js'

const getDoctors = async (req, res) => {
  try {
    const doctors = await doctorsUseCase.getDoctors()
    res.status(200).json(doctors)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getDoctorById = async (req, res) => {
  const { id } = req.params
  try {
    const doctor = await doctorsUseCase.getDoctorById(id)
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' })
    }
    res.status(200).json(doctor)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const createdDoctor = async (req, res) => {
  const { profileId, licenseNumber, resume } = req.body

  try {
    const doctor = await doctorsUseCase.createdDoctor({
      profileId,
      licenseNumber,
      resume,
    })
    res.status(201).json(doctor)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const updateDoctor = async (req, res) => {
  const { id } = req.params
  const { profileId, licenseNumber, resume } = req.body
  try {
    const doctor = await doctorsUseCase.updateDoctorById(id, {
      profileId,
      licenseNumber,
      resume,
    })
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' })
    }
    res.status(200).json(doctor)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const deleteDoctor = async (req, res) => {
  const { id } = req.params
  try {
    const doctor = await doctorsUseCase.deleteDoctorById(Number.parseInt(id))
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' })
    }

    res.status(200).json({ message: 'Doctor deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export { getDoctors, getDoctorById, createdDoctor, updateDoctor, deleteDoctor }
