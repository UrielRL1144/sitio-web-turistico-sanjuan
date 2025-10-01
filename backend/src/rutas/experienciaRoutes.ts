//rutas/experienciaRoutes.ts
import { Router } from 'express';
import { experienciaController } from '../controladores/experienciaController';
import { autenticarAdmin } from '../middleware/autenticacion';

const router = Router();

// Rutas públicas
router.get('/', experienciaController.obtenerExperiencias);
router.get('/:id', experienciaController.obtenerExperienciaPorId);

// Rutas protegidas (admin only)
router.get('/admin/pendientes', autenticarAdmin, experienciaController.obtenerExperienciasPendientes);
router.get('/admin/estadisticas', autenticarAdmin, experienciaController.obtenerEstadisticas);
router.patch('/:id/moderar', autenticarAdmin, experienciaController.moderarExperiencia);

export default router;