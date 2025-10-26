import prisma from '../../prisma/context.js'

const getClinicalNotes = async () => {
  const notes = await prisma.clinicalNotes.findMany({
    where: { deleted: false },
    include: {
      appointment: true,
    },
  })

  return notes
}

const getClinicalNoteById = async (id) => {
  const note = await prisma.clinicalNotes.findUnique({
    where: { id: Number.parseInt(id) },
    include: {
      appointment: true,
    },
  })

  return note
}

const createClinicalNote = async (data) => {
  const note = await prisma.clinicalNotes.create({
    data: {
      appointmentId: data.appointmentId,
      summary: data.summary,
      plan: data.plan,
      deleted: false,
    },
  })

  return note
}

const updateClinicalNoteById = async (id, data) => {
  const note = await prisma.clinicalNotes.update({
    where: { id: Number.parseInt(id) },
    data,
  })

  return note
}

const deleteClinicalNoteById = async (id) => {
  const note = await prisma.clinicalNotes.update({
    where: { id: Number.parseInt(id) },
    data: { deleted: true },
  })

  return note.id
}

export {
  getClinicalNotes,
  getClinicalNoteById,
  createClinicalNote,
  updateClinicalNoteById,
  deleteClinicalNoteById,
}
