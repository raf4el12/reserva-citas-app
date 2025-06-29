import * as profilesUseCase from './profiles.usecase.js'

const getProfiles = async (req, res) => {
  const profiles = await profilesUseCase.getProfiles()
  res.status(200).json(profiles)
}

const getProfilesById = async (req, res) => {
  const { id } = req.params
  const profiles = await profilesUseCase.getProfilesById(id)
  if (!profiles) {
    return res.status(404).json({ message: 'Profiles not found' })
  }
  res.status(200).json(profiles)
}

const createdProfiles = async (req, res) => {
  const {
    name,
    lastName,
    email,
    birthday,
    gender,
    national,
    photo,
    phone,
    address,
    typeProfileId,
    typeDocument,
    numberDocument,
    userId,
  } = req.body

  const profile = await profilesUseCase.createdProfiles({
    name,
    lastName,
    email,
    birthday,
    gender,
    national,
    photo,
    phone,
    address,
    typeProfileId,
    typeDocument,
    numberDocument,
    userId,
  })
  res.status(201).json(profile)
}

const updateProfiles = async (req, res) => {
  const { id } = req.params
  const { name, userId } = req.body
  const profiles = await profilesUseCase.updateProfilesById(id, {
    name,
    userId,
  })
  if (!profiles) {
    return res.status(404).json({ message: 'Profiles not found' })
  }
  res.status(200).json(profiles)
}

const deleteProfiles = async (req, res) => {
  const { id } = req.params
  const profiles = await profilesUseCase.deleteProfilesById(id)
  if (!profiles) {
    return res.status(404).json({ message: 'Profiles not found' })
  }
  res.status(200).json({ message: 'Profiles deleted successfully' })
}

const getProfilesByUserId = async (req, res) => {
  const { userId } = req.params
  const profiles = await specialtiesUseCase.getSpecialtiesByCategoryId(userId)
  res.status(200).json(profiles)
}

export {
  getProfiles,
  getProfilesById,
  createdProfiles,
  updateProfiles,
  deleteProfiles,
  getProfilesByUserId,
}
