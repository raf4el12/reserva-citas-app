import * as specialtiesUseCase from './specialties.usecase.js'

const getSpecialties = async (req, res) => {
  const specialties = await specialtiesUseCase.getSpecialties()
  res.status(200).json(specialties)
}

const getSpecialtyById = async (req, res) => {
  const { id } = req.params
  const specialty = await specialtiesUseCase.getSpecialtyById(id)
  if (!specialty) {
    return res.status(404).json({ message: 'Specialty not found' })
  }
  res.status(200).json(specialty)
}

const createdSpecialty = async (req, res) => {
  const { name, categoryId } = req.body
  const specialty = await specialtiesUseCase.createdSpecialty({
    name,
    categoryId,
  })
  res.status(201).json(specialty)
}

const updateSpecialty = async (req, res) => {
  const { id } = req.params
  const { name, description } = req.body
  const specialty = await specialtiesUseCase.updateSpecialtyById(id, {
    name,
    description,
  })
  if (!specialty) {
    return res.status(404).json({ message: 'Specialty not found' })
  }
  res.status(200).json(specialty)
}

const deleteSpecialty = async (req, res) => {
  const { id } = req.params
  const specialtyId = await specialtiesUseCase.deleteSpecialtyById(id)
  if (!specialtyId) {
    return res.status(404).json({ message: 'Specialty not found' })
  }
  res.status(200).json(specialtyId)
}

const getSpecialtiesByCategoryId = async (req, res) => {
  const { categoryId } = req.params
  const specialties =
    await specialtiesUseCase.getSpecialtiesByCategoryId(categoryId)
  res.status(200).json(specialties)
}

export {
  getSpecialties,
  getSpecialtyById,
  createdSpecialty,
  updateSpecialty,
  deleteSpecialty,
  getSpecialtiesByCategoryId,
}
