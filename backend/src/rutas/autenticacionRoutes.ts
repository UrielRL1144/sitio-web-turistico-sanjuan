//rutas/autenticacionRoutes.ts
import { Router } from 'express';
import passport from 'passport';
import { autenticacionController } from '../controladores/autenticacionController';

const router = Router();

// Iniciar flujo OAuth con Google
router.get('/google', passport.authenticate('google', { 
  scope: ['profile', 'email'],
  prompt: 'select_account'
}));

// Callback después de la autenticación de Google
router.get('/google/callback', 
  passport.authenticate('google', { session: false }),
  autenticacionController.callbackGoogle
);

export default router;