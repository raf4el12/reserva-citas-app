import * as profilesUseCase from './profiles.usecase.js';

const getProfiles = async (req, res) => {
  try {
    const profiles = await profilesUseCase.getProfiles();
    res.status(200).json(profiles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const getProfilesById = async (req, res) => {
  const { id } = req.params;
  try {
    const profiles = await profilesUseCase.getProfilesById(id);
    if (!profiles) {
      return res.status(404).json({ message: "Profiles not found" });
    }
    res.status(200).json(profiles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const createdProfiles = async (req, res) => {
  const { name, lastname, email, userId } = req.body;

  try {
    const profile = await profilesUseCase.createdProfiles({ name, lastname, email, userId });
    res.status(201).json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const updateProfiles = async (req, res) => {
  const { id } = req.params;
  const { name, userId } = req.body;
  try {
    const profiles = await profilesUseCase.updateProfilesById(id, { name, userId });
    if (!profiles) {
      return res.status(404).json({ message: "Profiles not found" });
    }
    res.status(200).json(profiles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const deleteProfiles = async (req, res) => {
  const { id } = req.params;
  try {
    const profiles = await profilesUseCase.deleteProfilesById(id);
    if (!profiles) {
      return res.status(404).json({ message: "Profiles not found" });
    }
    res.status(200).json({ message: "Profiles deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const getProfilesByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const profiles = await specialtiesUseCase.getSpecialtiesByCateogryId(userId);

    res.status(200).json(profiles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export {
  getProfiles,
  getProfilesById,
  createdProfiles,
  updateProfiles,
  deleteProfiles,
  getProfilesByUserId
}