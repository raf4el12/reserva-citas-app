import prisma from "../../prisma/context.js";


const getPatients = async () => {
  try {
    const patients = await prisma.patients.findMany({
      where: {
        deleted: false,
      },
      include: {
        profile: true, // Incluye la relación con el perfil
      },
    });
    return patients;
  } catch (error) {
    throw new Error("Error fetching patients: " + error.message);
  }
};

const getPatientById = async (id) => {
  try {
    const patient = await prisma.patients.findUnique({
      where: {
        id: parseInt(id), // Convertir el id a entero
      },
      include: {
        profile: true, // Incluye la relación con el perfil
      },
    });
    return patient;
  } catch (error) {
    throw new Error("Error fetching patient: " + error.message);
  }
};

const updatePatientById = async (id, data) => {
  try {
    const patient = await prisma.patients.update({
      where: {
        id: parseInt(id), // Convertir el id a entero
      },
      data: data,
      include: {
        profile: true, // Incluye la relación con el perfil
      },
    });
    return patient;
  } catch (error) {
    throw new Error("Error updating patient: " + error.message);
  }
}

const createPatient = async (data) => {
  try {
    const { profileId, emergencyContact, bloodType, allergies, chronic_conditions } = data;

    const patient = await prisma.patients.create({
      data: {
        profileId,
        emergencyContact,
        bloodType,
        allergies,
        chronic_conditions,
      },
      include: {
        profile: true, // Incluye datos relacionados del perfil
      },
    });
    return patient;
  } catch (error) {
    throw new Error("Error creating patient: " + error.message);
  }
};

const deletePatientById = async (id) => {
  try {
    const patient = await prisma.patients.update({
      where: {
        id: parseInt(id), // Convertir el id a entero
      },
      data: {
        deleted: true, // Marcar como eliminado
      },
      include: {
        profile: true, // Incluye la relación con el perfil
      },
    });
    return patient;
  } catch (error) {
    throw new Error("Error deleting patient: " + error.message);
  }
}

export {
  getPatients,
  getPatientById,
  updatePatientById,
  createPatient,
  deletePatientById
};