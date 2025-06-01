import * as schedulesUseCase from './schedules.usecase.js';

const getSchedules = async (req, res) => {
    try {
        const schedules = await schedulesUseCase.getSchedules();
        res.status(200).json(schedules);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getScheduleById = async (req, res) => {
    const { id } = req.params;
    try {
        const schedule = await schedulesUseCase.getScheduleById(id);
        if (!schedule) {
            return res.status(404).json({ message: 'Schedule not found' });
        }
        res.status(200).json(schedule);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateScheduleById = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    try {
        const updatedSchedule = await schedulesUseCase.updateScheduleById(id, data);
        res.status(200).json(updatedSchedule);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createdSchedule = async (req, res) => {
    const data = req.body;
    try {
        const newSchedule = await schedulesUseCase.createdSchedule(data);
        res.status(201).json(newSchedule);
    } catch (error) {
        console.error('Error creating schedule:', error); // Mostrar el error en consola
        res.status(500).json({ message: error.message });
    }
}

const deleteSchedule = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedSchedule = await schedulesUseCase.deleteSchedule(id);
        if (!deletedSchedule) {
            return res.status(404).json({ message: 'Schedule not found' });
        }
        res.status(200).json({ message: 'Schedule deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export {
    getSchedules,
    getScheduleById,
    updateScheduleById,
    createdSchedule,
    deleteSchedule
};