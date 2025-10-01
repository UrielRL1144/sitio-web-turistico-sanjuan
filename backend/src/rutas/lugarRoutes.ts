//rutas/lugarRoutes.ts
import { Router } from 'express';
import { lugarController } from '../controladores/lugarController';
import { autenticarAdmin } from '../middleware/autenticacion';
import { validacion } from '../middleware/validacion';

const router = Router();

// Rutas públicas
router.get('/', lugarController.obtenerLugares);
router.get('/categorias', lugarController.obtenerCategorias);
router.get('/:id', lugarController.obtenerLugarPorId);

// Rutas protegidas (admin only)
router.post('/', autenticarAdmin, validacion.validarCrearLugar, lugarController.crearLugar);
router.put('/:id', autenticarAdmin, validacion.validarCrearLugar, lugarController.actualizarLugar);
router.delete('/:id', autenticarAdmin, lugarController.eliminarLugar);

export default router;