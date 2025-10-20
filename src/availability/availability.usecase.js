import prisma from '../../prisma/context.js'

const getAvailability = async () => {
  const availabilities = await prisma.availability.findMany({
    where: {
      isAvailable: true,
    },
    include: {
      doctor: true,
      specialty: true,
    },
  })

  return availabilities
}

const getAvailabilityById = async (id) => {
  const availability = await prisma.availability.findUnique({
    where: {
      id: Number.parseInt(id),
    },
    include: {
      doctor: true,
      specialty: true,
    },
  })

  return availability
}

const updateAvailabilityById = async (id, data) => {
  const availability = await prisma.availability.update({
    where: {
      id: Number.parseInt(id),
    },
    data: data,
  })

  return availability
}

const createdAvailability = async (data) => {
  const {
    doctorId,
    specialtyId,
    startDate,
    endDate,
    dayOfWeek,
    timeFrom,
    timeTo,
    type,
    reason,
  } = data

  const availability = await prisma.availability.create({
    data: {
      doctorId: Number.parseInt(doctorId),
      specialtyId: Number.parseInt(specialtyId),
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      dayOfWeek,
      timeFrom,
      timeTo,
      isAvailable: true,
      type,
      reason,
    },
    include: {
      doctor: true,
      specialty: true,
    },
  })

  return availability
}

const deleteAvailabilityById = async (id) => {
  const availability = await prisma.availability.update({
    where: {
      id: Number.parseInt(id),
    },
    data: {
      isAvailable: false,
    },
  })

  return availability.id
}

export {
  getAvailability,
  getAvailabilityById,
  updateAvailabilityById,
  createdAvailability,
  deleteAvailabilityById,
}
