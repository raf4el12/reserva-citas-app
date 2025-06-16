import prisma from '../../prisma/context.js'

const getClinicalNotes = async () => {
  try {
    const notes = await prisma.clinicalNotes.findMany({
      where: { deleted: false },
      include: {
        appointment: true,
      },
    })
    return notes
  } catch (error) {
    throw new Error('Error fetching clinical notes: ' + error.message)
  }
}

const getClinicalNoteById = async (id) => {
  try {
    const note = await prisma.clinicalNotes.findUnique({
      where: { id: Number.parseInt(id) },
      include: {
        appointment: true,
      },
    })
    return note
  } catch (error) {
    throw new Error('Error fetching clinical note: ' + error.message)
  }
}

const createClinicalNote = async (data) => {
  try {
    const note = await prisma.clinicalNotes.create({
      data: {
        appointmentId: data.appointmentId,
        summary: data.summary,
        plan: data.plan,
        deleted: false,
      },
    })
    return note
  } catch (error) {
    throw new Error('Error creating clinical note: ' + error.message)
  }
}

const updateClinicalNoteById = async (id, data) => {
  try {
    const note = await prisma.clinicalNotes.update({
      where: { id: Number.parseInt(id) },
      data,
    })
    return note
  } catch (error) {
    throw new Error('Error updating clinical note: ' + error.message)
  }
}

const deleteClinicalNoteById = async (id) => {
  try {
    const note = await prisma.clinicalNotes.update({
      where: { id: Number.parseInt(id) },
      data: { deleted: true },
    })
    return note
  } catch (error) {
    throw new Error('Error deleting clinical note: ' + error.message)
  }
}

export {
  getClinicalNotes,
  getClinicalNoteById,
  createClinicalNote,
  updateClinicalNoteById,
  deleteClinicalNoteById,
}
