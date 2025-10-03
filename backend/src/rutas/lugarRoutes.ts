// rutas/lugarRoutes.ts - VERSIÓN COMPLETA CORREGIDA
import { Router } from 'express';
import { lugarController } from '../controladores/lugarController';
import { autenticarAdmin } from '../middleware/autenticacion';
import { validacion } from '../middleware/validacion';
import { uploadImage, uploadPDF, uploadMultipleImages } from '../utils/multerConfig';

const router = Router();

// ==================== RUTAS PÚBLICAS ====================
// Obtener todos los lugares (público) - ESTA ES LA QUE FALTA
router.get('/', lugarController.obtenerLugares);

// Obtener categorías disponibles (público)
router.get('/categorias', lugarController.obtenerCategorias);

// Obtener lugar específico por ID (público)
router.get('/:id', lugarController.obtenerLugarPorId);

// Obtener galería de imágenes de un lugar (público)
router.get('/:id/galeria', lugarController.obtenerGaleriaLugar);

// ==================== RUTAS PROTEGIDAS (ADMIN ONLY) ====================
// Crear lugar (admin)
router.post('/', 
  autenticarAdmin, 
  validacion.validarCrearLugar, 
  lugarController.crearLugar
);

// Actualizar lugar (admin)
router.put('/:id', 
  autenticarAdmin, 
  validacion.validarCrearLugar, 
  lugarController.actualizarLugar
);

// Eliminar lugar (admin)
router.delete('/:id', 
  autenticarAdmin, 
  lugarController.eliminarLugar
);

// Subir imagen principal (admin)
router.post('/:id/imagen', 
  autenticarAdmin, 
  uploadImage.single('imagen'),
  validacion.validarArchivoImagen,
  lugarController.subirImagenLugar
);

// Subir múltiples imágenes (admin)
router.post('/:id/imagenes', 
  autenticarAdmin, 
  uploadMultipleImages,
  lugarController.subirMultipleImagenesLugar
);

// Subir PDF (admin)
router.post('/:id/pdf', 
  autenticarAdmin, 
  uploadPDF.single('pdf'),
  validacion.validarArchivoPDF,
  lugarController.subirPDFLugar
);

// Eliminar imagen de galería (admin)
router.delete('/:id/galeria/:imagenId', 
  autenticarAdmin, 
  lugarController.eliminarImagenGaleria
);

// Establecer imagen como principal (admin)
router.put('/:id/galeria/:imagenId/principal', 
  autenticarAdmin, 
  lugarController.establecerImagenPrincipal
);

export default router;