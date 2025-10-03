// utils/multerConfig.ts
import multer from 'multer';
import path from 'path';
import { Request } from 'express';

// Configuración de almacenamiento para imágenes
const imageStorage = multer.diskStorage({
  destination: (req: Request, file, cb) => {
    let folder = 'uploads/images/';
    
    // Determinar si es para lugar o experiencia
    if (req.originalUrl.includes('/lugares/')) {
      folder += 'lugares/';
    } else if (req.originalUrl.includes('/experiencias/')) {
      folder += 'experiencias/';
    }
    
    cb(null, folder);
  },
  filename: (req: Request, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

// Configuración de almacenamiento para PDFs
const pdfStorage = multer.diskStorage({
  destination: (req: Request, file, cb) => {
    cb(null, 'uploads/pdfs/');
  },
  filename: (req: Request, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'pdf-' + uniqueSuffix + '.pdf');
  }
});

// Filtros de archivos
const imageFileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
  
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Tipo de archivo no permitido. Solo se permiten JPEG, PNG y WebP'));
  }
};

const pdfFileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Solo se permiten archivos PDF'));
  }
};

// Configuraciones de multer
export const uploadImage = multer({
  storage: imageStorage,
  fileFilter: imageFileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB límite
  }
});

export const uploadPDF = multer({
  storage: pdfStorage,
  fileFilter: pdfFileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB límite
  }
});

export const uploadMultipleImages = multer({
  storage: imageStorage,
  fileFilter: imageFileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  }
}).array('imagenes', 10); // Máximo 10 imágenes