import * as ClinicalNotesUseCase from './ClinicalNotes.usecase.js';

const getClinicalNotes = async (req, res) => {
    try {
        const ClinicalNotes = await ClinicalNotesUseCase.getClinicalNotes();
        res.status(200).json(ClinicalNotes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getClinicalNotesById = async (req, res) => {
    const { id } = req.params;
    try {
        const ClinicalNotes = await ClinicalNotesUseCase.getClinicalNotesById(id);
        if (!ClinicalNotes) {
            return res.status(404).json({ message: "Clinical notes not found" });
        }
        res.status(200).json(ClinicalNotes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createClinicalNotes = async (req, res) => {
    const { appointmentId} = req.body;
    try {
        const ClinicalNotes = await ClinicalNotesUseCase.createClinicalNotes({ appointmentId});
        res.status(201).json(ClinicalNotes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateClinicalNotesById = async (req, res) => {
    const { id } = req.params;
    const { appointmentId } = req.body;
    try {
        const ClinicalNotes = await ClinicalNotesUseCase.updateClinicalNotesById(id, { appointmentId});
        res.status(200).json(ClinicalNotes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteClinicalNotesById = async (req, res) => {
    const { id } = req.params;
    try {
        const ClinicalNotes = await ClinicalNotesUseCase.deleteClinicalNotesById(id);
        res.status(200).json(ClinicalNotes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export {
    getClinicalNotes,
    getClinicalNotesById,
    createClinicalNotes,
    updateClinicalNotesById,
    deleteClinicalNotesById
}