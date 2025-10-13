// middleware/validacion.ts
import { Request, Response, NextFunction } from 'express';
import fs from 'fs';


export const validacion = {
  // Validar archivos de imagen
validarArchivoImagen: (req: Request, res: Response, next: NextFunction) => {
  console.log('🔍 [VALIDACIÓN] Validando archivo...');
  console.log('🔍 [VALIDACIÓN] req.file:', req.file);
  
  if (!req.file) {
    console.error('❌ [VALIDACIÓN] No se recibió archivo');
    return res.status(400).json({ error: 'Archivo es requerido' });
  }

  const tiposPermitidos = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
  
  console.log('🔍 [VALIDACIÓN] MIME type recibido:', req.file.mimetype);
  
  if (!tiposPermitidos.includes(req.file.mimetype)) {
    console.error('❌ [VALIDACIÓN] Tipo MIME no permitido:', req.file.mimetype);
    
    // Eliminar el archivo subido
    if (req.file.path) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (error) {
        console.error('Error eliminando archivo inválido:', error);
      }
    }
    
    return res.status(400).json({ 
      error: 'Tipo de archivo no permitido. Use JPEG, PNG o WebP',
      tipo_recibido: req.file.mimetype
    });
  }

  console.log('✅ [VALIDACIÓN] Archivo válido');
  next();
},

  // Validar archivos PDF
  validarArchivoPDF: (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) {
      return res.status(400).json({ error: 'Archivo PDF es requerido' });
    }

    if (req.file.mimetype !== 'application/pdf') {
      return res.status(400).json({ error: 'Solo se permiten archivos PDF' });
    }

    next();
  },

  // ... (las otras validaciones anteriores)
  validarCrearLugar: (req: Request, res: Response, next: NextFunction) => {
    const { nombre, descripcion, ubicacion, categoria } = req.body;

    if (!nombre || nombre.trim().length === 0) {
      return res.status(400).json({ error: 'El nombre del lugar es requerido' });
    }

    if (nombre.length > 100) {
      return res.status(400).json({ error: 'El nombre no puede exceder 100 caracteres' });
    }

    if (descripcion && descripcion.length > 1000) {
      return res.status(400).json({ error: 'La descripción no puede exceder 1000 caracteres' });
    }

    next();
  },

  validarCalificacion: (req: Request, res: Response, next: NextFunction) => {
    const { calificacion, lugarId } = req.body;

    if (!lugarId) {
      return res.status(400).json({ error: 'ID del lugar es requerido' });
    }

    if (!calificacion || calificacion < 1 || calificacion > 5) {
      return res.status(400).json({ error: 'La calificación debe ser entre 1 y 5' });
    }

    if (req.body.comentario && req.body.comentario.length > 500) {
      return res.status(400).json({ error: 'El comentario no puede exceder 500 caracteres' });
    }

    next();
  },

  validarExperiencia: (req: Request, res: Response, next: NextFunction) => {
    const { descripcion } = req.body;

    if (descripcion && descripcion.length > 500) {
      return res.status(400).json({ error: 'La descripción no puede exceder 500 caracteres' });
    }

    next();
  }
};