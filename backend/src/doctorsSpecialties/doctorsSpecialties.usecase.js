import prisma from "../../prisma/context.js";

const getDoctorsSpecialties = async () => {
  try {
    const doctorsSpecialties = await prisma.doctorsSpecialties.findMany({
      include: {
        doctor: true,
        specialty: true,
      },
    });
    return doctorsSpecialties;
  } catch (error) {
    throw new Error(`Error fetching doctors specialties: ${error.message}`);
  }
}

const getDoctorsSpecialtyById = async (id) => {
  try {
    const doctorsSpecialty = await prisma.doctorsSpecialties.findUnique({
      where: { id },
      include: {
        doctor: true,
        specialty: true,
      },
    });
    if (!doctorsSpecialty) {
      throw new Error(`Doctors specialty with ID ${id} not found`);
    }
    return doctorsSpecialty;
  } catch (error) {
    throw new Error(`Error fetching doctors specialty by ID: ${error.message}`);
  }
}

const createDoctorsSpecialty = async ({ doctorId, specialtyId }) => {
  try {
    const doctorsSpecialty = await prisma.doctorsSpecialties.create({
      data: {
        doctorId,
        specialtyId,
      },
      include: {
        doctor: true,
        specialty: true,
      },
    });
    return doctorsSpecialty;
  } catch (error) {
    throw new Error(`Error creating doctors specialty: ${error.message}`);
  }
}

const updateCategoryById = async (id, { doctorId, specialtyId }) => {
  try {
    const doctorsSpecialty = await prisma.doctorsSpecialties.update({
      where: { id },
      data: {
        doctorId,
        specialtyId,
      },
      include: {
        doctor: true,
        specialty: true,
      },
    });
    return doctorsSpecialty;
  } catch (error) {
    throw new Error(`Error updating doctors specialty by ID: ${error.message}`);
  }
}

const deleteCategoryById = async (id) => {
  try {
    const doctorsSpecialty = await prisma.doctorsSpecialties.delete({
      where: { id },
    });
    return doctorsSpecialty;
  } catch (error) {
    throw new Error(`Error deleting doctors specialty by ID: ${error.message}`);
  }
}

export {
  getDoctorsSpecialties,
  getDoctorsSpecialtyById,
  createDoctorsSpecialty,
  updateCategoryById,
  deleteCategoryById
};