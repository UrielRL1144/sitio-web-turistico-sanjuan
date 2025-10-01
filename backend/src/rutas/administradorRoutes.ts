//rutas/administradorRoutes.ts
import { Router } from 'express';
import { administradorController } from '../controladores/administradorController';
import { autenticarAdmin } from '../middleware/autenticacion';

const router = Router();

// Login local (opcional)
router.post('/login', administradorController.login);

// Rutas protegidas
router.get('/perfil', autenticarAdmin, administradorController.obtenerPerfil);

export default router;