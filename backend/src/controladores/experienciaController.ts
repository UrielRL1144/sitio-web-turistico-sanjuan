//controladores/experienciaController.ts
import { Request, Response } from 'express';
import { pool } from '../utils/baseDeDatos';

export const experienciaController = {
  // Obtener todas las experiencias aprobadas (público)
  async obtenerExperiencias(req: Request, res: Response) {
    try {
      const { pagina = 1, limite = 20 } = req.query;
      const offset = (Number(pagina) - 1) * Number(limite);

      const result = await pool.query(
        `SELECT e.*, l.nombre as lugar_nombre, l.ubicacion as lugar_ubicacion
         FROM experiencias e
         LEFT JOIN lugares l ON e.lugar_id = l.id
         WHERE e.estado = 'aprobado'
         ORDER BY e.creado_en DESC
         LIMIT $1 OFFSET $2`,
        [limite, offset]
      );

      const countResult = await pool.query(
        'SELECT COUNT(*) FROM experiencias WHERE estado = $1',
        ['aprobado']
      );

      res.json({
        experiencias: result.rows,
        total: parseInt(countResult.rows[0].count),
        pagina: Number(pagina),
        totalPaginas: Math.ceil(parseInt(countResult.rows[0].count) / Number(limite))
      });
    } catch (error) {
      console.error('Error obteniendo experiencias:', error);
      res.status(500).json({ error: 'Error al obtener experiencias' });
    }
  },

  // Obtener experiencia por ID (público)
  async obtenerExperienciaPorId(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const result = await pool.query(
        `SELECT e.*, l.nombre as lugar_nombre, l.ubicacion as lugar_ubicacion
         FROM experiencias e
         LEFT JOIN lugares l ON e.lugar_id = l.id
         WHERE e.id = $1 AND e.estado = 'aprobado'`,
        [id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Experiencia no encontrada' });
      }

      // Incrementar contador de vistas
      await pool.query(
        'UPDATE experiencias SET contador_vistas = contador_vistas + 1 WHERE id = $1',
        [id]
      );

      // Registrar vista anónima
      await pool.query(
        'INSERT INTO vistas_experiencias (experiencia_id, ip_usuario, agente_usuario) VALUES ($1, $2, $3)',
        [id, req.ip, req.get('User-Agent')]
      );

      res.json({ experiencia: result.rows[0] });
    } catch (error) {
      console.error('Error obteniendo experiencia:', error);
      res.status(500).json({ error: 'Error al obtener experiencia' });
    }
  },

  // Obtener experiencias pendientes (admin only)
  async obtenerExperienciasPendientes(req: Request, res: Response) {
    try {
      const { pagina = 1, limite = 20 } = req.query;
      const offset = (Number(pagina) - 1) * Number(limite);

      const result = await pool.query(
        `SELECT e.*, l.nombre as lugar_nombre
         FROM experiencias e
         LEFT JOIN lugares l ON e.lugar_id = l.id
         WHERE e.estado = 'pendiente'
         ORDER BY e.creado_en DESC
         LIMIT $1 OFFSET $2`,
        [limite, offset]
      );

      const countResult = await pool.query(
        'SELECT COUNT(*) FROM experiencias WHERE estado = $1',
        ['pendiente']
      );

      res.json({
        experiencias: result.rows,
        total: parseInt(countResult.rows[0].count),
        pagina: Number(pagina)
      });
    } catch (error) {
      console.error('Error obteniendo experiencias pendientes:', error);
      res.status(500).json({ error: 'Error al obtener experiencias pendientes' });
    }
  },

  // Aprobar/rechazar experiencia (admin only)
  async moderarExperiencia(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { accion, razon } = req.body; // accion: 'aprobar' o 'rechazar'

      if (!['aprobar', 'rechazar'].includes(accion)) {
        return res.status(400).json({ error: 'Acción no válida' });
      }

      const estado = accion === 'aprobar' ? 'aprobado' : 'rechazado';

      const result = await pool.query(
        'UPDATE experiencias SET estado = $1 WHERE id = $2 RETURNING *',
        [estado, id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Experiencia no encontrada' });
      }

      res.json({
        mensaje: `Experiencia ${accion === 'aprobar' ? 'aprobada' : 'rechazada'} exitosamente`,
        experiencia: result.rows[0]
      });
    } catch (error) {
      console.error('Error moderando experiencia:', error);
      res.status(500).json({ error: 'Error al moderar experiencia' });
    }
  },

  // Estadísticas de experiencias (admin only)
  async obtenerEstadisticas(req: Request, res: Response) {
    try {
      const result = await pool.query(`
        SELECT 
          estado,
          COUNT(*) as cantidad,
          SUM(contador_vistas) as total_vistas
        FROM experiencias 
        GROUP BY estado
      `);

      const totalResult = await pool.query('SELECT COUNT(*) FROM experiencias');
      const vistasResult = await pool.query('SELECT SUM(contador_vistas) FROM experiencias');

      res.json({
        por_estado: result.rows,
        total: parseInt(totalResult.rows[0].count),
        total_vistas: parseInt(vistasResult.rows[0].sum || '0')
      });
    } catch (error) {
      console.error('Error obteniendo estadísticas:', error);
      res.status(500).json({ error: 'Error al obtener estadísticas' });
    }
  }
};