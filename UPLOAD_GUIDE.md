# 📸 Guía de Carga de Archivos - Doctors API

## 🎯 Problema Resuelto
Cuando intentabas guardar una imagen desde tu PC, el error era porque Prisma esperaba un `String` (la ruta) pero estaba recibiendo el objeto File.

## ✅ Solución Implementada

### Backend configurado para:
1. ✅ Recibir archivos en el campo `photo` vía `multipart/form-data`
2. ✅ Guardar el archivo físicamente en `/uploads/`
3. ✅ Guardar la **ruta** (string) en `Profiles.photo` en la BD
4. ✅ Servir la imagen públicamente en `http://localhost:3000/uploads/imagen.jpg`

---

## 📤 Ejemplo de Petición desde Frontend

### Opción 1: JavaScript Vanilla
```javascript
// Crear FormData con todos los campos
const formData = new FormData()

// Campos de texto
formData.append('name', 'Juan')
formData.append('lastName', 'Pérez')
formData.append('email', 'juan.perez@hospital.com')
formData.append('phone', '555-1234')
formData.append('licenseNumber', 'MED-12345')
formData.append('resume', 'Médico con 10 años de experiencia')
formData.append('address', 'Av. Principal 123')
formData.append('gender', 'male')
formData.append('birthDate', '1985-05-15')

// Array de especialidades (como JSON string)
formData.append('specialtyIds', JSON.stringify([1, 2, 3]))

// ARCHIVO - Obtener del input file
const fileInput = document.querySelector('input[type="file"]')
if (fileInput.files[0]) {
  formData.append('photo', fileInput.files[0])
}

// Enviar petición
fetch('http://localhost:3000/api/doctors', {
  method: 'POST',
  body: formData, // NO envíes Content-Type, el navegador lo establece automáticamente
  credentials: 'include'
})
  .then(res => res.json())
  .then(data => {
    console.log('✅ Doctor creado:', data)
    // La foto estará en: data.data.profile.photo
    // Ej: "/uploads/doctor-1698345678-123456789.jpg"
  })
  .catch(err => console.error('❌ Error:', err))
```

### Opción 2: React con useState
```jsx
import { useState } from 'react'

function CreateDoctorForm() {
  const [file, setFile] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    phone: '',
    licenseNumber: '',
    resume: '',
    specialtyIds: []
  })

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const data = new FormData()
    
    // Agregar todos los campos de texto
    Object.keys(formData).forEach(key => {
      if (key === 'specialtyIds') {
        data.append(key, JSON.stringify(formData[key]))
      } else {
        data.append(key, formData[key])
      }
    })

    // Agregar archivo si existe
    if (file) {
      data.append('photo', file)
    }

    try {
      const response = await fetch('http://localhost:3000/api/doctors', {
        method: 'POST',
        body: data,
        credentials: 'include'
      })

      const result = await response.json()
      console.log('✅ Doctor creado:', result)
      
      // Mostrar imagen
      if (result.data.profile.photo) {
        const imageUrl = `http://localhost:3000${result.data.profile.photo}`
        console.log('📷 Imagen en:', imageUrl)
      }
    } catch (error) {
      console.error('❌ Error:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="file" 
        accept="image/*"
        onChange={handleFileChange}
      />
      {/* ... otros campos ... */}
      <button type="submit">Crear Doctor</button>
    </form>
  )
}
```

### Opción 3: Axios
```javascript
import axios from 'axios'

async function createDoctor(doctorData, photoFile) {
  const formData = new FormData()
  
  // Agregar campos de texto
  Object.keys(doctorData).forEach(key => {
    if (key === 'specialtyIds') {
      formData.append(key, JSON.stringify(doctorData[key]))
    } else {
      formData.append(key, doctorData[key])
    }
  })
  
  // Agregar archivo
  if (photoFile) {
    formData.append('photo', photoFile)
  }

  try {
    const response = await axios.post(
      'http://localhost:3000/api/doctors',
      formData,
      {
        headers: {
          // NO especifiques Content-Type, axios lo hace automáticamente
        },
        withCredentials: true
      }
    )
    
    console.log('✅ Doctor creado:', response.data)
    return response.data
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error)
    throw error
  }
}

// Uso
const doctorData = {
  name: 'Juan',
  lastName: 'Pérez',
  email: 'juan@example.com',
  licenseNumber: 'MED-12345',
  specialtyIds: [1, 2]
}

const fileInput = document.querySelector('input[type="file"]')
createDoctor(doctorData, fileInput.files[0])
```

---

## 🖼️ Visualizar la Imagen

Una vez creado el doctor, la respuesta incluirá:

```json
{
  "message": "Doctor creado exitosamente",
  "data": {
    "id": 1,
    "licenseNumber": "MED-12345",
    "profile": {
      "id": 1,
      "name": "Juan",
      "lastName": "Pérez",
      "photo": "/uploads/juan-perez-1698345678-123456789.jpg"
    }
  }
}
```

Para mostrar la imagen en HTML:
```html
<img 
  src="http://localhost:3000/uploads/juan-perez-1698345678-123456789.jpg" 
  alt="Foto del doctor"
/>
```

O dinámicamente:
```javascript
const imageUrl = `http://localhost:3000${doctor.profile.photo}`
```

---

## 🔧 Actualizar Doctor con Nueva Foto

```javascript
const formData = new FormData()
formData.append('name', 'Juan Actualizado')
formData.append('photo', newFile) // Nueva foto

fetch('http://localhost:3000/api/doctors/1', {
  method: 'PUT',
  body: formData,
  credentials: 'include'
})
```

---

## ⚠️ Errores Comunes

### ❌ Error: "Expected String, got File"
**Causa**: Enviar el objeto File directamente al backend sin procesarlo.
**Solución**: Usar `FormData` y `multer` como se muestra arriba.

### ❌ Error: "Unexpected field"
**Causa**: El nombre del campo no coincide con el configurado en multer.
**Solución**: Asegúrate de usar `formData.append('photo', file)` (no `image`, `file`, etc.)

### ❌ Error: "File too large"
**Causa**: El archivo excede 5MB.
**Solución**: Cambiar el límite en `src/middlewares/upload.js`:
```javascript
limits: {
  fileSize: 10 * 1024 * 1024 // 10MB
}
```

### ❌ Error: "Invalid file type"
**Causa**: Intentar subir un tipo de archivo no permitido.
**Solución**: Solo se permiten: JPEG, PNG, WebP, GIF, PDF.

---

## 🎯 Flujo Completo

```
Frontend                    Backend                     Base de Datos
   |                          |                              |
   |--- FormData con file --->|                              |
   |                          |--- multer procesa ---------->|
   |                          |    y guarda en /uploads/     |
   |                          |                              |
   |                          |--- Genera ruta string ------>|
   |                          |    "/uploads/file.jpg"       |
   |                          |                              |
   |                          |--- Guarda en Profiles.photo->| ✅
   |                          |                              |
   |<--- Respuesta JSON ------|                              |
   |     con ruta guardada    |                              |
```

---

## 🧪 Probar con cURL

```bash
curl -X POST http://localhost:3000/api/doctors \
  -H "Cookie: accessToken=tu_token_aqui" \
  -F "name=Juan" \
  -F "lastName=Pérez" \
  -F "email=juan@example.com" \
  -F "licenseNumber=MED-12345" \
  -F "specialtyIds=[1,2]" \
  -F "photo=@/ruta/a/tu/imagen.jpg"
```

---

## 📝 Notas Importantes

1. **NO envíes `Content-Type`** manualmente - el navegador lo hace automáticamente con el boundary correcto
2. Los **specialtyIds deben ser JSON string**: `JSON.stringify([1,2,3])`
3. La **ruta guardada en BD** es relativa: `/uploads/file.jpg`
4. La **URL completa** para mostrar es: `http://localhost:3000/uploads/file.jpg`
5. El backend **valida tipos y tamaño** automáticamente

---

¡Listo! 🚀 Ahora puedes subir imágenes desde tu PC correctamente.
