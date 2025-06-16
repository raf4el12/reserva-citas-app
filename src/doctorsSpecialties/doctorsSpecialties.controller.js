import * as doctorsSpecialtiesUseCase from './doctorsSpecialties.usecase.js'

const getDoctorsSpecialties = async (req, res) => {
  try {
    const doctorsSpecialties =
      await doctorsSpecialtiesUseCase.getDoctorsSpecialties()
    res.status(200).json(doctorsSpecialties)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getDoctorsSpecialtyById = async (req, res) => {
  const { id } = req.params
  try {
    const doctorsSpecialty =
      await doctorsSpecialtiesUseCase.getDoctorsSpecialtyById(id)
    if (!doctorsSpecialty) {
      return res.status(404).json({ message: 'Doctors specialty not found' })
    }
    res.status(200).json(doctorsSpecialty)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const createDoctorsSpecialty = async (req, res) => {
  const { doctorId, specialtyId } = req.body

  if (!doctorId || !specialtyId) {
    return res
      .status(400)
      .json({ message: 'Doctor ID and Specialty ID are required' })
  }
  try {
    const doctorsSpecialty =
      await doctorsSpecialtiesUseCase.createDoctorsSpecialty({
        doctorId,
        specialtyId,
      })
    res.status(201).json(doctorsSpecialty)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const updateDoctorsSpecialty = async (req, res) => {
  const { id } = req.params
  const { doctorId, specialtyId } = req.body
  try {
    const doctorsSpecialty =
      await doctorsSpecialtiesUseCase.updateDoctorsSpecialtyById(id, {
        doctorId,
        specialtyId,
      })
    if (!doctorsSpecialty) {
      return res.status(404).json({ message: 'Doctors specialty not found' })
    }
    res.status(200).json(doctorsSpecialty)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const deleteDoctorsSpecialty = async (req, res) => {
  const { id } = req.params
  try {
    const doctorsSpecialty =
      await doctorsSpecialtiesUseCase.deleteDoctorsSpecialtyById(id)
    if (!doctorsSpecialty) {
      return res.status(404).json({ message: 'Doctors specialty not found' })
    }
    res.status(200).json({ message: 'Doctors specialty deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export {
  getDoctorsSpecialties,
  getDoctorsSpecialtyById,
  createDoctorsSpecialty,
  updateDoctorsSpecialty,
  deleteDoctorsSpecialty,
}
