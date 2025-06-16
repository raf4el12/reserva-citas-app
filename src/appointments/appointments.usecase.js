import prisma from '../../prisma/context.js'

const getAppointments = async () => {
  const appointments = await prisma.appointments.findMany({
    where: { deleted: false },
    include: {
      patient: true,
      schedule: true,
    },
  })

  return appointments
}

const getAppointmentById = async (id) => {
  const appointment = await prisma.appointments.findUnique({
    where: { id: Number.parseInt(id) },
    include: {
      patient: true,
      schedule: true,
    },
  })

  return appointment
}

const createAppointment = async (data) => {
  const appointment = await prisma.appointments.create({
    data: {
      patientId: data.patientId,
      scheduleId: data.scheduleId,
      reason: data.reason,
      status: data.status,
      paymentStatus: data.paymentStatus,
      deleted: false,
    },
  })

  return appointment
}

const updateAppointmentById = async (id, data) => {
  const appointment = await prisma.appointments.update({
    where: { id: Number.parseInt(id) },
    data,
  })

  return appointment
}

const deleteAppointmentById = async (id) => {
  const appointment = await prisma.appointments.update({
    where: { id: Number.parseInt(id) },
    data: { deleted: true },
  })

  return appointment
}

export {
  getAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointmentById,
  deleteAppointmentById,
}
