import * as clinicalnotesUseCase from './clinicalnotes.usecase.js';

const getClinicalNotes = async (req, res) => {
  try {
    const notes = await clinicalnotesUseCase.getClinicalNotes();
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const getClinicalNoteById = async (req, res) => {
  const { id } = req.params;
  try {
    const note = await clinicalnotesUseCase.getClinicalNoteById(id);
    if (!note) {
      return res.status(404).json({ error: 'Clinical note not found' });
    }
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const createClinicalNote = async (req, res) => {
  const data = req.body;
  try {
    const note = await clinicalnotesUseCase.createClinicalNote(data);
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const updateClinicalNoteById = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const note = await clinicalnotesUseCase.updateClinicalNoteById(id, data);
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const deleteClinicalNoteById = async (req, res) => {
  const { id } = req.params;
  try {
    const note = await clinicalnotesUseCase.deleteClinicalNoteById(id);
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


export {
    getClinicalNotes,
    getClinicalNoteById,
    createClinicalNote,
    updateClinicalNoteById,
    deleteClinicalNoteById,
}