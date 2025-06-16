import prisma from '../../prisma/context.js'

const getAvailability = async () => {
  try {
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
  } catch (error) {
    throw new Error('Error fetching availabilities: ' + error.message)
  }
}

const getAvailabilityById = async (id) => {
  try {
    const availability = await prisma.availability.findUnique({
      where: {
        id: Number.parseInt(id), // convertir el id a entero
      },
      include: {
        doctor: true,
        specialty: true,
      },
    })
    return availability
  } catch (error) {
    throw new Error('Error fetching availability: ' + error.message)
  }
}

const updateAvailabilityById = async (id, data) => {
  try {
    const availability = await prisma.availability.update({
      where: {
        id: Number.parseInt(id), // convertir el id a entero
      },
      data: data,
    })
    return availability
  } catch (error) {
    throw new Error('Error updating availability: ' + error.message)
  }
}

const createdAvailability = async (data) => {
  try {
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
  } catch (error) {
    throw new Error('Error creating availability: ' + error.message)
  }
}

const deleteAvailabilityById = async (id) => {
  try {
    const availability = await prisma.availability.update({
      where: {
        id: Number.parseInt(id), // convertir el id a entero
      },
      data: {
        isAvailable: false,
      },
    })
    return availability
  } catch (error) {
    throw new Error('Error deleting availability: ' + error.message)
  }
}

export {
  getAvailability,
  getAvailabilityById,
  updateAvailabilityById,
  createdAvailability,
  deleteAvailabilityById,
}
