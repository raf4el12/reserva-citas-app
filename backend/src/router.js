import express from 'express'
import appointmentsRoutes from './appointments/appointments.routes.js' // Assuming you have a similar route for appointments
import availabilityRoutes from './availability/availability.routes.js' // Assuming you have a similar route for availability
import categoryRoutes from './categories/category.routes.js'
import clinicalNotesRoutes from './clinicalnotes/clinicalnotes.routes.js' // Assuming you have a similar route for clinical notes
import doctorRoutes from './doctors/doctors.routes.js' // Assuming you have a similar route for doctors
import doctorsSpecialtiesRoutes from './doctorsSpecialties/doctorsSpecialties.routes.js' // Assuming you have a similar route for doctors specialties
import patients from './patients/patients.routes.js' // Assuming you have a similar route for patients
import profileRoutes from './profiles/profiles.routes.js' // Assuming you have a similar route for profiles
import schedulesRoutes from './schedules/schedules.routes.js' // Assuming you have a similar route for schedules
import specialtyRoutes from './specialties/specialties.routes.js'
import userRoutes from './user/user.routes.js' // Assuming you have a similar route for specialties

import authRoutes from './auth/auth.routes.js' // Assuming you have a similar route for authentication

const router = express.Router()

router.use('/categories', categoryRoutes)
router.use('/specialties', specialtyRoutes) // Assuming you have a similar route for specialties
router.use('/users', userRoutes) // Assuming you have a similar route for users
router.use('/profiles', profileRoutes) // Assuming you have a similar route for profiles
router.use('/doctors', doctorRoutes) // Assuming you have a similar route for doctors
router.use('/doctors-specialties', doctorsSpecialtiesRoutes) // Assuming you have a similar route for doctors specialties
router.use('/patients', patients) // Assuming you have a similar route for patients
router.use('/availability', availabilityRoutes) // Assuming you have a similar route for availability
router.use('/schedules', schedulesRoutes) // Assuming you have a similar route for schedules
router.use('/appointments', appointmentsRoutes) // Assuming you have a similar route for appointments
router.use('/clinical-notes', clinicalNotesRoutes) // Assuming you have a similar route for clinical notes

router.use('/auth', authRoutes) // Assuming you have a similar route for authentication
export default router
