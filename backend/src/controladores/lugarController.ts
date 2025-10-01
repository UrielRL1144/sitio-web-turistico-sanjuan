//controladores/lugarController.ts
import { Request, Response } from 'express';
import { pool } from '../utils/baseDeDatos';

export const lugarController = {
  // Obtener todos los lugares (público)
  async obtenerLugares(req: Request, res: Response) {
    try {
      const { categoria, pagina = 1, limite = 20 } = req.query;
      const offset = (Number(pagina) - 1) * Number(limite);

      let query = `
        SELECT l.*, 
               COUNT(DISTINCT cl.id) as total_calificaciones,
               COUNT(DISTINCT e.id) as total_experiencias
        FROM lugares l
        LEFT JOIN calificaciones_lugares cl ON l.id = cl.lugar_id
        LEFT JOIN experiencias e ON l.id = e.lugar_id AND e.estado = 'aprobado'
      `;
      
      let countQuery = 'SELECT COUNT(*) FROM lugares';
      const queryParams: any[] = [];
      const countParams: any[] = [];

      if (categoria) {
        query += ' WHERE l.categoria = $1';
        countQuery += ' WHERE categoria = $1';
        queryParams.push(categoria);
        countParams.push(categoria);
      }

      query += ` 
        GROUP BY l.id
        ORDER BY l.puntuacion_promedio DESC, l.total_calificaciones DESC
        LIMIT $${queryParams.length + 1} OFFSET $${queryParams.length + 2}
      `;
      
      queryParams.push(limite, offset);

      const result = await pool.query(query, queryParams);
      const countResult = await pool.query(countQuery, countParams);

      res.json({
        lugares: result.rows,
        total: parseInt(countResult.rows[0].count),
        pagina: Number(pagina),
        totalPaginas: Math.ceil(parseInt(countResult.rows[0].count) / Number(limite))
      });
    } catch (error) {
      console.error('Error obteniendo lugares:', error);
      res.status(500).json({ error: 'Error al obtener lugares' });
    }
  },

  // Obtener lugar por ID (público)
  async obtenerLugarPorId(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const lugarResult = await pool.query(
        `SELECT l.*, 
                COUNT(DISTINCT e.id) as total_experiencias
         FROM lugares l
         LEFT JOIN experiencias e ON l.id = e.lugar_id AND e.estado = 'aprobado'
         WHERE l.id = $1
         GROUP BY l.id`,
        [id]
      );

      if (lugarResult.rows.length === 0) {
        return res.status(404).json({ error: 'Lugar no encontrado' });
      }

      const fotosResult = await pool.query(
        'SELECT * FROM fotos_lugares WHERE lugar_id = $1 ORDER BY es_principal DESC, orden ASC',
        [id]
      );

      const experienciasResult = await pool.query(
        `SELECT e.* 
         FROM experiencias e 
         WHERE e.lugar_id = $1 AND e.estado = 'aprobado'
         ORDER BY e.creado_en DESC
         LIMIT 10`,
        [id]
      );

      res.json({
        lugar: lugarResult.rows[0],
        fotos: fotosResult.rows,
        experiencias: experienciasResult.rows
      });
    } catch (error) {
      console.error('Error obteniendo lugar:', error);
      res.status(500).json({ error: 'Error al obtener lugar' });
    }
  },

  // Crear lugar (admin only)
  async crearLugar(req: Request, res: Response) {
    try {
      const { nombre, descripcion, ubicacion, categoria, foto_principal_url, pdf_url } = req.body;

      const result = await pool.query(
        `INSERT INTO lugares 
         (nombre, descripcion, ubicacion, categoria, foto_principal_url, pdf_url)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING *`,
        [nombre, descripcion, ubicacion, categoria, foto_principal_url, pdf_url]
      );

      res.status(201).json({
        mensaje: 'Lugar creado exitosamente',
        lugar: result.rows[0]
      });
    } catch (error) {
      console.error('Error creando lugar:', error);
      res.status(500).json({ error: 'Error al crear lugar' });
    }
  },

  // Actualizar lugar (admin only)
  async actualizarLugar(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { nombre, descripcion, ubicacion, categoria, foto_principal_url, pdf_url } = req.body;

      const result = await pool.query(
        `UPDATE lugares 
         SET nombre = $1, descripcion = $2, ubicacion = $3, categoria = $4, 
             foto_principal_url = $5, pdf_url = $6, actualizado_en = NOW()
         WHERE id = $7
         RETURNING *`,
        [nombre, descripcion, ubicacion, categoria, foto_principal_url, pdf_url, id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Lugar no encontrado' });
      }

      res.json({
        mensaje: 'Lugar actualizado exitosamente',
        lugar: result.rows[0]
      });
    } catch (error) {
      console.error('Error actualizando lugar:', error);
      res.status(500).json({ error: 'Error al actualizar lugar' });
    }
  },

  // Eliminar lugar (admin only)
  async eliminarLugar(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const result = await pool.query(
        'DELETE FROM lugares WHERE id = $1 RETURNING *',
        [id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Lugar no encontrado' });
      }

      res.json({ mensaje: 'Lugar eliminado exitosamente' });
    } catch (error) {
      console.error('Error eliminando lugar:', error);
      res.status(500).json({ error: 'Error al eliminar lugar' });
    }
  },

  // Obtener categorías únicas (público)
  async obtenerCategorias(req: Request, res: Response) {
    try {
      const result = await pool.query(
        'SELECT DISTINCT categoria FROM lugares WHERE categoria IS NOT NULL ORDER BY categoria'
      );

      res.json({
        categorias: result.rows.map(row => row.categoria)
      });
    } catch (error) {
      console.error('Error obteniendo categorías:', error);
      res.status(500).json({ error: 'Error al obtener categorías' });
    }
  }
};