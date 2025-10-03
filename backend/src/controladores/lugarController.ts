//controladores/lugarController.ts
import { Request, Response } from 'express';
import { pool } from '../utils/baseDeDatos';
import path from 'path';
import fs from 'fs';

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
  },
  async subirImagenLugar(req: Request, res: Response) {
  try {
    const { id } = req.params;
    
    if (!req.file) {
      return res.status(400).json({ error: 'No se proporcionó ninguna imagen' });
    }

    // Verificar que el lugar existe
    const lugarResult = await pool.query(
      'SELECT id FROM lugares WHERE id = $1',
      [id]
    );

    if (lugarResult.rows.length === 0) {
      // Eliminar el archivo subido si el lugar no existe
      if (req.file.path) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(404).json({ error: 'Lugar no encontrado' });
    }

    const rutaImagen = `/uploads/images/lugares/${req.file.filename}`;

    // Actualizar la foto principal en la tabla lugares
    await pool.query(
      'UPDATE lugares SET foto_principal_url = $1 WHERE id = $2',
      [rutaImagen, id]
    );

    // También insertar en fotos_lugares como principal
    await pool.query(
      `INSERT INTO fotos_lugares (lugar_id, url_foto, es_principal, descripcion, orden, 
       ruta_almacenamiento, tamaño_archivo, tipo_archivo)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [
        id,
        rutaImagen,
        true,
        'Imagen principal del lugar',
        1,
        req.file.path,
        req.file.size,
        req.file.mimetype
      ]
    );

    res.json({
      mensaje: 'Imagen subida exitosamente',
      url_imagen: rutaImagen,
      archivo: {
        nombre: req.file.filename,
        tamaño: req.file.size,
        tipo: req.file.mimetype
      }
    });
  } catch (error) {
    console.error('Error subiendo imagen:', error);
    
    // Eliminar archivo en caso de error
    if (req.file?.path) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (unlinkError) {
        console.error('Error eliminando archivo:', unlinkError);
      }
    }
    
    res.status(500).json({ error: 'Error al subir imagen' });
  }
},

// Subir múltiples imágenes para galería del lugar
async subirMultipleImagenesLugar(req: Request, res: Response) {
  try {
    const { id } = req.params;
    
    if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
      return res.status(400).json({ error: 'No se proporcionaron imágenes' });
    }

    // Verificar que el lugar existe
    const lugarResult = await pool.query(
      'SELECT id FROM lugares WHERE id = $1',
      [id]
    );

    if (lugarResult.rows.length === 0) {
      // Eliminar todos los archivos subidos
      req.files.forEach(file => {
        if (file.path) fs.unlinkSync(file.path);
      });
      return res.status(404).json({ error: 'Lugar no encontrado' });
    }

    // Obtener el máximo orden actual para este lugar
    const maxOrdenResult = await pool.query(
      'SELECT COALESCE(MAX(orden), 0) as max_orden FROM fotos_lugares WHERE lugar_id = $1',
      [id]
    );
    
    let orden = maxOrdenResult.rows[0].max_orden + 1;

    const imagenesSubidas = [];

    // Insertar cada imagen en la tabla fotos_lugares
    for (const file of req.files) {
      const rutaImagen = `/uploads/images/lugares/${file.filename}`;
      
      await pool.query(
        `INSERT INTO fotos_lugares (lugar_id, url_foto, es_principal, descripcion, orden, 
         ruta_almacenamiento, tamaño_archivo, tipo_archivo)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [
          id,
          rutaImagen,
          false, // No es principal
          `Imagen ${orden} del lugar`,
          orden,
          file.path,
          file.size,
          file.mimetype
        ]
      );

      imagenesSubidas.push({
        url: rutaImagen,
        nombre: file.filename,
        tamaño: file.size,
        tipo: file.mimetype,
        orden: orden
      });

      orden++;
    }

    res.json({
      mensaje: `${req.files.length} imágenes subidas exitosamente`,
      imagenes: imagenesSubidas
    });
  } catch (error) {
    console.error('Error subiendo múltiples imágenes:', error);
    
    // Eliminar archivos en caso de error
    if (req.files && Array.isArray(req.files)) {
      req.files.forEach(file => {
        if (file.path) {
          try {
            fs.unlinkSync(file.path);
          } catch (unlinkError) {
            console.error('Error eliminando archivo:', unlinkError);
          }
        }
      });
    }
    
    res.status(500).json({ error: 'Error al subir imágenes' });
  }
},

// Subir PDF de lugar
async subirPDFLugar(req: Request, res: Response) {
  try {
    const { id } = req.params;
    
    if (!req.file) {
      return res.status(400).json({ error: 'No se proporcionó ningún PDF' });
    }

    // Verificar que el lugar existe
    const lugarResult = await pool.query(
      'SELECT id FROM lugares WHERE id = $1',
      [id]
    );

    if (lugarResult.rows.length === 0) {
      // Eliminar el archivo subido si el lugar no existe
      if (req.file.path) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(404).json({ error: 'Lugar no encontrado' });
    }

    const rutaPDF = `/uploads/pdfs/${req.file.filename}`;

    // Actualizar el PDF en la tabla lugares
    await pool.query(
      'UPDATE lugares SET pdf_url = $1 WHERE id = $2',
      [rutaPDF, id]
    );

    res.json({
      mensaje: 'PDF subido exitosamente',
      url_pdf: rutaPDF,
      archivo: {
        nombre: req.file.filename,
        tamaño: req.file.size,
        tipo: req.file.mimetype
      }
    });
  } catch (error) {
    console.error('Error subiendo PDF:', error);
    
    // Eliminar archivo en caso de error
    if (req.file?.path) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (unlinkError) {
        console.error('Error eliminando archivo:', unlinkError);
      }
    }
    
    res.status(500).json({ error: 'Error al subir PDF' });
  }
},

// Obtener galería de imágenes de un lugar
async obtenerGaleriaLugar(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `SELECT id, url_foto, descripcion, es_principal, orden, 
              ancho_imagen, alto_imagen, tamaño_archivo, tipo_archivo, creado_en
       FROM fotos_lugares 
       WHERE lugar_id = $1 
       ORDER BY es_principal DESC, orden ASC`,
      [id]
    );

    res.json({
      lugar_id: id,
      imagenes: result.rows,
      total: result.rows.length
    });
  } catch (error) {
    console.error('Error obteniendo galería:', error);
    res.status(500).json({ error: 'Error al obtener galería de imágenes' });
  }
},

// Eliminar imagen de la galería
async eliminarImagenGaleria(req: Request, res: Response) {
  try {
    const { id, imagenId } = req.params;

    // Verificar que la imagen pertenece al lugar
    const imagenResult = await pool.query(
      'SELECT * FROM fotos_lugares WHERE id = $1 AND lugar_id = $2',
      [imagenId, id]
    );

    if (imagenResult.rows.length === 0) {
      return res.status(404).json({ error: 'Imagen no encontrada o no pertenece al lugar' });
    }

    const imagen = imagenResult.rows[0];

    // No permitir eliminar la imagen principal
    if (imagen.es_principal) {
      return res.status(400).json({ error: 'No se puede eliminar la imagen principal' });
    }

    // Eliminar el archivo físico
    if (imagen.ruta_almacenamiento && fs.existsSync(imagen.ruta_almacenamiento)) {
      fs.unlinkSync(imagen.ruta_almacenamiento);
    }

    // Eliminar de la base de datos
    await pool.query(
      'DELETE FROM fotos_lugares WHERE id = $1',
      [imagenId]
    );

    res.json({ mensaje: 'Imagen eliminada exitosamente' });
  } catch (error) {
    console.error('Error eliminando imagen:', error);
    res.status(500).json({ error: 'Error al eliminar imagen' });
  }
},

// Establecer imagen como principal
async establecerImagenPrincipal(req: Request, res: Response) {
  try {
    const { id, imagenId } = req.params;

    // Verificar que la imagen pertenece al lugar
    const imagenResult = await pool.query(
      'SELECT * FROM fotos_lugares WHERE id = $1 AND lugar_id = $2',
      [imagenId, id]
    );

    if (imagenResult.rows.length === 0) {
      return res.status(404).json({ error: 'Imagen no encontrada o no pertenece al lugar' });
    }

    // Actualizar todas las imágenes del lugar a no principales
    await pool.query(
      'UPDATE fotos_lugares SET es_principal = false WHERE lugar_id = $1',
      [id]
    );

    // Establecer la imagen seleccionada como principal
    await pool.query(
      'UPDATE fotos_lugares SET es_principal = true WHERE id = $1',
      [imagenId]
    );

    // Actualizar también la foto_principal_url en la tabla lugares
    const imagen = imagenResult.rows[0];
    await pool.query(
      'UPDATE lugares SET foto_principal_url = $1 WHERE id = $2',
      [imagen.url_foto, id]
    );

    res.json({ mensaje: 'Imagen establecida como principal exitosamente' });
  } catch (error) {
    console.error('Error estableciendo imagen principal:', error);
    res.status(500).json({ error: 'Error al establecer imagen principal' });
  }
}

};