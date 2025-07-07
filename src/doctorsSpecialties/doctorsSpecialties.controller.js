import * as doctorsSpecialtiesUseCase from './doctorsSpecialties.usecase.js'

const getDoctorsSpecialties = async (req, res) => {
  const doctorsSpecialties =
    await doctorsSpecialtiesUseCase.getDoctorsSpecialties()
  res.status(200).json(doctorsSpecialties)
}

const getDoctorsSpecialtyById = async (req, res) => {
  const { id } = req.params
  const doctorsSpecialty =
    await doctorsSpecialtiesUseCase.getDoctorsSpecialtyById(id)
  if (!doctorsSpecialty) {
    return res.status(404).json({ message: 'Doctors specialty not found' })
  }
  res.status(200).json(doctorsSpecialty)
}

const createDoctorsSpecialty = async (req, res) => {
  const { doctorId, specialtyId } = req.body

  if (!doctorId || !specialtyId) {
    return res
      .status(400)
      .json({ message: 'Doctor ID and Specialty ID are required' })
  }
  const doctorsSpecialty =
    await doctorsSpecialtiesUseCase.createDoctorsSpecialty({
      doctorId,
      specialtyId,
    })
  res.status(201).json(doctorsSpecialty)
}

const updateDoctorsSpecialty = async (req, res) => {
  const { id } = req.params
  const { doctorId, specialtyId } = req.body
  const doctorsSpecialty =
    await doctorsSpecialtiesUseCase.updateDoctorsSpecialtyById(id, {
      doctorId,
      specialtyId,
    })
  if (!doctorsSpecialty) {
    return res.status(404).json({ message: 'Doctors specialty not found' })
  }
  res.status(200).json(doctorsSpecialty)
}

const deleteDoctorsSpecialty = async (req, res) => {
  const { id } = req.params
  const doctorsSpecialtyId =
    await doctorsSpecialtiesUseCase.deleteDoctorsSpecialtyById(id)
  if (!doctorsSpecialtyId) {
    return res.status(404).json({ message: 'Doctors specialty not found' })
  }
  res.status(200).json(doctorsSpecialtyId)
}

export {
  getDoctorsSpecialties,
  getDoctorsSpecialtyById,
  createDoctorsSpecialty,
  updateDoctorsSpecialty,
  deleteDoctorsSpecialty,
}
