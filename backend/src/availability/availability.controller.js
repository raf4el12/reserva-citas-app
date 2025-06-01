import * as availabilityUseCase from './availability.usecase.js';

const getAvailability = async (req, res) => {
    try {
        const availabilities = await availabilityUseCase.getAvailability();
        res.status(200).json(availabilities);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getAvailabilityById = async (req, res) => {
    const { id } = req.params;
    try {
        const availability = await availabilityUseCase.getAvailabilityById(id);
        if (!availability) {
            return res.status(404).json({ message: 'Availability not found' });
        }
        res.status(200).json(availability);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateAvailabilityById = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    try {
        const updatedAvailability = await availabilityUseCase.updateAvailabilityById(id, data);
        res.status(200).json(updatedAvailability);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createdAvailability = async (req, res) => {
    const data = req.body;
    try {
        const newAvailability = await availabilityUseCase.createdAvailability(data);
        res.status(201).json(newAvailability);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteAvailability = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedAvailability = await availabilityUseCase.deleteAvailabilityById(id);
        if (!deletedAvailability) {
            return res.status(404).json({ message: 'Availability not found' });
        }
        res.status(200).json({ message: 'Availability deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export {
    getAvailability,
    getAvailabilityById,
    updateAvailabilityById,
    createdAvailability,
    deleteAvailability
};