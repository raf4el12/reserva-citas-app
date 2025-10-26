import multer from 'multer'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Configuración de almacenamiento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Guarda en carpeta uploads/
    const uploadPath = path.join(__dirname, '../../uploads')
    cb(null, uploadPath)
  },
  filename: (req, file, cb) => {
    // Genera nombre único: timestamp-random-nombreoriginal.ext
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
    const ext = path.extname(file.originalname)
    const baseName = path.basename(file.originalname, ext)
    cb(null, `${baseName}-${uniqueSuffix}${ext}`)
  },
})

// Filtro de tipos de archivo permitidos
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'image/gif',
    'application/pdf',
  ]

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(
      new Error(
        'Tipo de archivo no permitido. Solo se permiten imágenes (JPEG, PNG, WebP, GIF) y PDF'
      ),
      false
    )
  }
}

// Configuración de multer
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB máximo
  },
})

// Middlewares específicos para diferentes casos de uso
export const uploadSingle = (fieldName) => upload.single(fieldName)
export const uploadMultiple = (fieldName, maxCount = 5) =>
  upload.array(fieldName, maxCount)
export const uploadFields = (fields) => upload.fields(fields)

export default upload
