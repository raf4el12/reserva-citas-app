import * as availabilityUseCase from './availability.usecase.js'

const getAvailability = async (req, res) => {
  const availabilities = await availabilityUseCase.getAvailability()
  res.status(200).json(availabilities)
}

const getAvailabilityById = async (req, res) => {
  const { id } = req.params
  const availability = await availabilityUseCase.getAvailabilityById(id)
  if (!availability) {
    return res.status(404).json({ message: 'Availability not found' })
  }
  res.status(200).json(availability)
}

const updateAvailabilityById = async (req, res) => {
  const { id } = req.params
  const data = req.body
  const updatedAvailability = await availabilityUseCase.updateAvailabilityById(
    id,
    data
  )
  res.status(200).json(updatedAvailability)
}

const createdAvailability = async (req, res) => {
  const data = req.body
  const newAvailability = await availabilityUseCase.createdAvailability(data)
  res.status(201).json(newAvailability)
}

const deleteAvailability = async (req, res) => {
  const { id } = req.params
  const deletedAvailability =
    await availabilityUseCase.deleteAvailabilityById(id)
  if (!deletedAvailability) {
    return res.status(404).json({ message: 'Availability not found' })
  }
  res.status(200).json({ message: 'Availability deleted successfully' })
}

export {
  getAvailability,
  getAvailabilityById,
  updateAvailabilityById,
  createdAvailability,
  deleteAvailability,
}
