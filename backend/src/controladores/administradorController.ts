//controladores/administradorController.ts
import { Request, Response } from 'express';
import { pool } from '../utils/baseDeDatos';
import { generarToken } from '../utils/jwt';
import { compararContraseña } from '../utils/hashPassword';

export const administradorController = {
  // Login local (opcional)
  async login(req: Request, res: Response) {
    const { email, contraseña } = req.body;
    
    try {
      const result = await pool.query(
        'SELECT * FROM administradores WHERE email = $1 AND contraseña IS NOT NULL',
        [email]
      );
      
      if (result.rows.length === 0) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }
      
      const admin = result.rows[0];
      const contraseñaValida = await compararContraseña(contraseña, admin.contraseña);
      
      if (!contraseñaValida) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }
      
      // Actualizar último login
      await pool.query(
        'UPDATE administradores SET ultimo_login = NOW() WHERE id = $1',
        [admin.id]
      );
      
      const token = generarToken({
        id: admin.id,
        email: admin.email,
        rol: admin.rol,
        tipo: 'admin'
      });
      
      res.json({
        token,
        administrador: {
          id: admin.id,
          usuario: admin.usuario,
          email: admin.email,
          rol: admin.rol,
          avatar_url: admin.avatar_url
        }
      });
    } catch (error) {
      console.error('Error en login:', error);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  },

  // Perfil del admin
  async obtenerPerfil(req: Request, res: Response) {
    res.json({
      administrador: req.administrador
    });
  }
};