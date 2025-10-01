import { Request, Response, NextFunction } from 'express';

export const validacion = {
  // Validar archivos de imagen
  validarArchivoImagen: (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) {
      return res.status(400).json({ error: 'Archivo es requerido' });
    }

    const tiposPermitidos = ['image/jpeg', 'image/png', 'image/webp'];
    if (!tiposPermitidos.includes(req.file.mimetype)) {
      return res.status(400).json({ error: 'Tipo de archivo no permitido. Use JPEG, PNG o WebP' });
    }

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