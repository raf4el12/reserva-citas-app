import prisma from "../../prisma/context";

const getClinicalNotes = async () => {
    try {
        const ClinicalNotes = await prisma.clinicalNotes.findMany({
            where:{
                appointment: true,
            }
        });
        return ClinicalNotes;
    } catch (error) {
        throw new Error("Error fetching users: " + error.message);
    }
};

const getClinicalNotesById = async (id) =>{
    try {
        const ClinicalNotes = await prisma.clinicalNotes.findUnique({
            where:{ id },
            include: {
                appointment: true,
            },
        });
        return ClinicalNotes;
    } catch (error) {
        throw new Error(`Error fetching doctors specialty by ID: ${error.message}`);
    }
}

const createClinicalNotes = async ({ appointmentId, note }) => {
    try {
        const ClinicalNotes = await prisma.clinicalNotes.create({
            data: {
                appointmentId,
            },
            
        });
        return ClinicalNotes;
    } catch (error) {
        throw new Error(`Error creating clinical notes: ${error.message}`);
    }
}

const updateClinicalNotesById = async (id, { appointmentId, note }) => {
    try {
        const ClinicalNotes = await prisma.clinicalNotes.update({
            where: { id },
            data: {
                appointmentId,
            },
        })
        return ClinicalNotes;
    } catch (error) {
        throw new Error(`Error updating clinical notes by ID: ${error.message}`);
    }
}   

const deleteClinicalNotesById = async (id) => {
    try {
        const ClinicalNotes = await prisma.clinicalNotes.delete({
            where: { id },
        })
        return ClinicalNotes;
    } catch (error) {
        throw new Error(`Error deleting clinical notes by ID: ${error.message}`);
    }
}

export {
    getClinicalNotes,
    getClinicalNotesById,
    createClinicalNotes,
    updateClinicalNotesById,
    deleteClinicalNotesById
}   