//rutas/calificacionRoutes.ts
import { Router } from 'express';
import { calificacionController } from '../controladores/calificacionController';
import { autenticarAdmin } from '../middleware/autenticacion';
import { validacion } from '../middleware/validacion';

const router = Router();

// Rutas públicas
router.post('/', validacion.validarCalificacion, calificacionController.calificarLugar);
router.get('/lugar/:lugarId/mi-calificacion', calificacionController.obtenerMiCalificacion);

// Rutas protegidas (admin only)
router.get('/lugar/:lugarId', autenticarAdmin, calificacionController.obtenerCalificacionesLugar);

export default router;