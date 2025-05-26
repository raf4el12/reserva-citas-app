import * as specialtiesUseCase from "./specialties.usecase.js";

const getSpecialties = async (req, res) => {
  try {
    const specialties = await specialtiesUseCase.getSpecialties();
    res.status(200).json(specialties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const getSpecialtyById = async (req, res) => {
  const { id } = req.params;
  try {
    const specialty = await specialtiesUseCase.getSpecialtyById(id);
    if (!specialty) {
      return res.status(404).json({ message: "Specialty not found" });
    }
    res.status(200).json(specialty);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const createdSpecialty = async (req, res) => {
  const { name, categoryId } = req.body;
  try {
    const specialty = await specialtiesUseCase.createdSpecialty({ name, categoryId });
    res.status(201).json(specialty);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const updateSpecialty = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    const specialty = await specialtiesUseCase.updateSpecialtyById(id, { name, description });
    if (!specialty) {
      return res.status(404).json({ message: "Specialty not found" });
    }
    res.status(200).json(specialty);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const deleteSpecialty = async (req, res) => {
  const { id } = req.params;
  try {
    const specialty = await specialtiesUseCase.deleteSpecialtyById(id);
    if (!specialty) {
      return res.status(404).json({ message: "Specialty not found" });
    }
    res.status(200).json({ message: "Specialty deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const getSpecialtiesByCateogryId = async (req, res) => {
  const { categoryId } = req.params;

  try {
    const specialties = await specialtiesUseCase.getSpecialtiesByCateogryId(categoryId);

    res.status(200).json(specialties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export {
    getSpecialties,
    getSpecialtyById,
    createdSpecialty,
    updateSpecialty,
    deleteSpecialty,
    getSpecialtiesByCateogryId
}