import * as clinicalNotesUseCase from './clinicalnotes.usecase.js'

const getClinicalNotes = async (req, res) => {
  const notes = await clinicalNotesUseCase.getClinicalNotes()
  res.status(200).json(notes)
}

const getClinicalNoteById = async (req, res) => {
  const { id } = req.params
  const note = await clinicalNotesUseCase.getClinicalNoteById(id)
  if (!note) {
    return res.status(404).json({ error: 'ClinicalNote note not found' })
  }
  res.status(200).json(note)
}

const createClinicalNote = async (req, res) => {
  const data = req.body
  const note = await clinicalNotesUseCase.createClinicalNote(data)
  res.status(201).json(note)
}

const updateClinicalNoteById = async (req, res) => {
  const { id } = req.params
  const data = req.body
  const note = await clinicalNotesUseCase.updateClinicalNoteById(id, data)
  res.status(200).json(note)
}

const deleteClinicalNoteById = async (req, res) => {
  const { id } = req.params
  const noteId = await clinicalNotesUseCase.deleteClinicalNoteById(id)
  if (!noteId)
    return res.status(404).json({ message: 'ClinicalNote not found' })

  res.status(200).json(noteId)
}

export {
  getClinicalNotes,
  getClinicalNoteById,
  createClinicalNote,
  updateClinicalNoteById,
  deleteClinicalNoteById,
}
