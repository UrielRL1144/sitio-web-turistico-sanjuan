//controladores/autenticacionController.ts
import { Request, Response } from 'express';
import { pool } from '../utils/baseDeDatos';
import { generarToken } from '../utils/jwt';

export const autenticacionController = {
  async callbackGoogle(req: Request, res: Response) {
    try {
      const profile = req.user as any; // ← Los datos de Google vienen aquí
      const adminEmail = process.env.ADMIN_EMAIL;
      
      // Solo permitir el email autorizado (juanramiro139@gmail.com)
      if (profile.email !== adminEmail) {
        return res.redirect(`${process.env.FRONTEND_URL}/admin/login?error=unauthorized`);
      }
      
      // Upsert del administrador en la BD
      const result = await pool.query(
        `INSERT INTO administradores (usuario, email, proveedor, id_proveedor, avatar_url, rol, verificado)
         VALUES ($1, $2, 'google', $3, $4, 'super_admin', true)
         ON CONFLICT (email) 
         DO UPDATE SET 
           usuario = EXCLUDED.usuario,
           avatar_url = EXCLUDED.avatar_url,
           ultimo_login = NOW(),
           actualizado_en = NOW()
         RETURNING *`,
        [
          profile.displayName || profile.email.split('@')[0],
          profile.email,
          profile.id,
          profile.photos?.[0]?.value
        ]
      );
      
      const admin = result.rows[0];
      const token = generarToken({
        id: admin.id,
        email: admin.email,
        rol: admin.rol,
        tipo: 'admin'
      });
      
      // Redirigir al frontend con el token
      res.redirect(`${process.env.FRONTEND_URL}/admin/dashboard?token=${token}`);
    } catch (error) {
      console.error('Error en callback Google:', error);
      res.redirect(`${process.env.FRONTEND_URL}/admin/login?error=server_error`);
    }
  }
};