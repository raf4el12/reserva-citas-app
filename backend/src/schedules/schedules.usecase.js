import prisma from '../../prisma/context.js'

const getSchedules = async () => {
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
}

const getScheduleById = async (id) => {
  const schedule = await prisma.schedules.findUnique({
    where: {
      id: Number.parseInt(id),
    },
    include: {
      patient: true,
      doctor: true,
      specialty: true,
    },
  })

  return schedule
}

const updateScheduleById = async (id, data) => {
  const schedule = await prisma.schedules.update({
    where: {
      id: Number.parseInt(id),
    },
    data: data,
  })

  return schedule
}

const createdSchedule = async (data) => {
  const schedule = await prisma.schedules.create({
    data: data,
  })

  return schedule
}

const deleteSchedule = async (id) => {
  const schedule = await prisma.schedules.delete({
    where: {
      id: Number.parseInt(id),
    },
  })

  return schedule
}

export {
  getSchedules,
  getScheduleById,
  updateScheduleById,
  createdSchedule,
  deleteSchedule,
}
