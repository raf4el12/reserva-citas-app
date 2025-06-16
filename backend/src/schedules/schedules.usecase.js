import prisma from '../../prisma/context.js'

const getSchedules = async () => {
  try {
    const schedules = await prisma.schedules.findMany({
      include: {
        doctor: true,
        specialty: true,
        appointments: {
          include: {
            patient: {
              include: {
                profile: {
                  select: {
                    id: true,
                    name: true,
                    lastName: true,
                  },
                },
              },
            },
          },
        },
      },
    })
    return schedules
  } catch (error) {
    throw new Error('Error fetching schedules: ' + error.message)
  }
}

const getScheduleById = async (id) => {
  try {
    const schedule = await prisma.schedules.findUnique({
      where: {
        id: Number.parseInt(id), // convertir el id a entero
      },
      include: {
        patient: true,
        doctor: true,
        specialty: true,
      },
    })
    return schedule
  } catch (error) {
    throw new Error('Error fetching schedule: ' + error.message)
  }
}

const updateScheduleById = async (id, data) => {
  try {
    const schedule = await prisma.schedules.update({
      where: {
        id: Number.parseInt(id), // convertir el id a entero
      },
      data: data,
    })
    return schedule
  } catch (error) {
    throw new Error('Error updating schedule: ' + error.message)
  }
}

const createdSchedule = async (data) => {
  try {
    const schedule = await prisma.schedules.create({
      data: data,
    })
    return schedule
  } catch (error) {
    throw new Error('Error creating schedule: ' + error.message)
  }
}

const deleteSchedule = async (id) => {
  try {
    const schedule = await prisma.schedules.delete({
      where: {
        id: Number.parseInt(id), // convertir el id a entero
      },
    })
    return schedule
  } catch (error) {
    throw new Error('Error deleting schedule: ' + error.message)
  }
}

export {
  getSchedules,
  getScheduleById,
  updateScheduleById,
  createdSchedule,
  deleteSchedule,
}
