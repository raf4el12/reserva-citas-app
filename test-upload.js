#!/usr/bin/env node
/**
 * Script de prueba para la carga de archivos
 * Uso: node test-upload.js
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const COLORS = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
}

function log(message, color = 'reset') {
  console.log(`${COLORS[color]}${message}${COLORS.reset}`)
}

async function testUploadSetup() {
  log('\n🔍 Verificando configuración de carga de archivos...\n', 'blue')

  const checks = []

  // 1. Verificar directorio uploads
  const uploadsDir = path.join(__dirname, 'uploads')
  if (fs.existsSync(uploadsDir)) {
    log('✅ Directorio /uploads existe', 'green')
    checks.push(true)

    // Verificar permisos de escritura
    try {
      const testFile = path.join(uploadsDir, '.test-write')
      fs.writeFileSync(testFile, 'test')
      fs.unlinkSync(testFile)
      log('✅ Directorio /uploads tiene permisos de escritura', 'green')
      checks.push(true)
    } catch (error) {
      log('❌ Directorio /uploads NO tiene permisos de escritura', 'red')
      log(`   Error: ${error.message}`, 'red')
      checks.push(false)
    }
  } else {
    log('❌ Directorio /uploads NO existe', 'red')
    log('   Ejecuta: mkdir -p uploads', 'yellow')
    checks.push(false)
  }

  // 2. Verificar middleware upload
  const uploadMiddleware = path.join(__dirname, 'src/middlewares/upload.js')
  if (fs.existsSync(uploadMiddleware)) {
    log('✅ Middleware de upload existe', 'green')
    checks.push(true)
  } else {
    log('❌ Middleware de upload NO existe', 'red')
    checks.push(false)
  }

  // 3. Verificar instalación de multer
  const packageJson = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'package.json'), 'utf-8')
  )
  if (packageJson.dependencies?.multer) {
    log('✅ Multer instalado', 'green')
    checks.push(true)
  } else {
    log('❌ Multer NO está instalado', 'red')
    log('   Ejecuta: npm install multer', 'yellow')
    checks.push(false)
  }

  // 4. Verificar configuración en routes
  const doctorsRoutes = path.join(__dirname, 'src/doctors/doctors.routes.js')
  if (fs.existsSync(doctorsRoutes)) {
    const content = fs.readFileSync(doctorsRoutes, 'utf-8')
    if (content.includes('uploadSingle')) {
      log('✅ Rutas de doctors configuradas con uploadSingle', 'green')
      checks.push(true)
    } else {
      log('⚠️  Rutas de doctors NO tienen uploadSingle', 'yellow')
      checks.push(false)
    }
  }

  // 5. Verificar configuración en index.js
  const indexFile = path.join(__dirname, 'src/index.js')
  if (fs.existsSync(indexFile)) {
    const content = fs.readFileSync(indexFile, 'utf-8')
    if (content.includes('/uploads') && content.includes('express.static')) {
      log('✅ Servidor configurado para servir archivos estáticos', 'green')
      checks.push(true)
    } else {
      log('⚠️  Servidor NO está sirviendo archivos estáticos', 'yellow')
      checks.push(false)
    }
  }

  // Resumen
  log('\n' + '='.repeat(50), 'blue')
  const passed = checks.filter((c) => c).length
  const total = checks.length

  if (passed === total) {
    log(`\n✅ Todo configurado correctamente (${passed}/${total})`, 'green')
    log('\n📤 Ejemplo de petición:\n', 'blue')
    log(`
const formData = new FormData()
formData.append('name', 'Juan')
formData.append('lastName', 'Pérez')
formData.append('email', 'juan@example.com')
formData.append('licenseNumber', 'MED-12345')
formData.append('specialtyIds', JSON.stringify([1, 2]))
formData.append('photo', fileInput.files[0]) // <-- Tu archivo

fetch('http://localhost:3000/api/doctors', {
  method: 'POST',
  body: formData,
  credentials: 'include'
})
    `, 'reset')
  } else {
    log(
      `\n⚠️  Configuración incompleta (${passed}/${total} checks pasados)`,
      'yellow'
    )
    log('\nRevisa los errores arriba y corrígelos.', 'yellow')
  }

  log('='.repeat(50) + '\n', 'blue')
}

testUploadSetup().catch((error) => {
  log(`\n❌ Error ejecutando pruebas: ${error.message}`, 'red')
  process.exit(1)
})
