import prisma from '../../prisma/context.js';

// Obtener todas las citas activas
const getAppointments = async () => {
  try {
    const appointments = await prisma.appointments.findMany({
      where: { deleted: false },
      include: {
        patient: true,
        schedule: true,
      }
    });
    return appointments;
  } catch (error) {
    throw new Error('Error fetching appointments: ' + error.message);
  }
};

// Obtener cita por ID
const getAppointmentById = async (id) => {
  try {
    const appointment = await prisma.appointments.findUnique({
      where: { id: parseInt(id) },
      include: {
        patient: true,
        schedule: true,
      }
    });
    return appointment;
  } catch (error) {
    throw new Error('Error fetching appointment: ' + error.message);
  }
};

// Crear nueva cita
const createAppointment = async (data) => {
  try {
    const appointment = await prisma.appointments.create({
      data: {
        patientId: data.patientId,
        scheduleId: data.scheduleId,
        reason: data.reason,
        status: data.status,
        paymentStatus: data.paymentStatus,
        deleted: false,
      }
    });
    return appointment;
  } catch (error) {
    throw new Error('Error creating appointment: ' + error.message);
  }
};

// Actualizar cita
const updateAppointmentById = async (id, data) => {
  try {
    const appointment = await prisma.appointments.update({
      where: { id: parseInt(id) },
      data,
    });
    return appointment;
  } catch (error) {
    throw new Error('Error updating appointment: ' + error.message);
  }
};

// Eliminar (soft delete) cita
const deleteAppointmentById = async (id) => {
  try {
    const appointment = await prisma.appointments.update({
      where: { id: parseInt(id) },
      data: { deleted: true },
    });
    return appointment;
  } catch (error) {
    throw new Error('Error deleting appointment: ' + error.message);
  }
};

export {
  getAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointmentById,
  deleteAppointmentById,
};
