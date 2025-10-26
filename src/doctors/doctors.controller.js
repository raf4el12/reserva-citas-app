import * as doctorsUseCase from './doctors.usecase.js'

const getDoctors = async (req, res) => {
  const doctors = await doctorsUseCase.getDoctors()
  res.status(200).json(doctors)
}

const getDoctorById = async (req, res) => {
  const { id } = req.params
  const doctor = await doctorsUseCase.getDoctorById(id)
  if (!doctor) {
    return res.status(404).json({ message: 'Doctor not found' })
  }
  res.status(200).json(doctor)
}

const createdDoctor = async (req, res) => {
  try {
    const data = { ...req.body }

    // Parsear specialtyIds si viene como string JSON o array de strings
    if (data.specialtyIds) {
      if (typeof data.specialtyIds === 'string') {
        try {
          data.specialtyIds = JSON.parse(data.specialtyIds)
        } catch {
          // Si no es JSON válido, convertir a array
          data.specialtyIds = [data.specialtyIds]
        }
      }
    }

    // Si hay archivo subido, agregar la ruta
    if (req.file) {
      data.photo = `/uploads/${req.file.filename}`
    }

    console.log('📥 Datos recibidos:', {
      ...data,
      hasFile: !!req.file,
      fileName: req.file?.filename,
    })

    const doctor = await doctorsUseCase.createdDoctor(data)

    res.status(201).json({
      message: 'Doctor creado exitosamente',
      data: doctor,
    })
  } catch (error) {
    console.error('❌ Error creating doctor:', error)
    res.status(500).json({
      message: error.message || 'Error al crear doctor',
      status: 500,
    })
  }
}

const updateDoctor = async (req, res) => {
  try {
    const { id } = req.params
    const data = { ...req.body }

    // Parsear specialtyIds si viene como string JSON o array de strings
    if (data.specialtyIds) {
      if (typeof data.specialtyIds === 'string') {
        try {
          data.specialtyIds = JSON.parse(data.specialtyIds)
        } catch {
          data.specialtyIds = [data.specialtyIds]
        }
      }
    }

    // Si hay archivo subido, agregar la ruta
    if (req.file) {
      data.photo = `/uploads/${req.file.filename}`
    }

    console.log('📝 Actualizando doctor:', {
      id,
      ...data,
      hasFile: !!req.file,
      fileName: req.file?.filename,
    })

    const doctor = await doctorsUseCase.updateDoctorById(id, data)

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' })
    }

    res.status(200).json(doctor)
  } catch (error) {
    console.error('❌ Error updating doctor:', error)
    res.status(500).json({
      message: error.message || 'Error al actualizar doctor',
      status: 500,
    })
  }
}

const deleteDoctor = async (req, res) => {
  const { id } = req.params
  const doctorId = await doctorsUseCase.deleteDoctorById(Number.parseInt(id))
  if (!doctorId) {
    return res.status(404).json({ message: 'Doctor not found' })
  }

  res.status(200).json(doctorId)
}

export { getDoctors, getDoctorById, createdDoctor, updateDoctor, deleteDoctor }
