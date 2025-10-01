// ✅ ESTO DEBE SER LO PRIMERO EN EL ARCHIVO
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import path from 'path';
import passport from './utils/oauth';
import { middlewareIpNavegador } from './middleware/ipNavegador';

// Rutas
import administradorRoutes from './rutas/administradorRoutes';
import autenticacionRoutes from './rutas/autenticacionRoutes';
import lugarRoutes from './rutas/lugarRoutes';
import experienciaRoutes from './rutas/experienciaRoutes';
import calificacionRoutes from './rutas/calificacionRoutes';
import archivosRoutes from './rutas/archivosRoutes';

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());
app.use(passport.initialize());
app.use(middlewareIpNavegador);

// Servir archivos estáticos
app.use('/images', express.static(path.join(__dirname, '../images')));
app.use('/pdfs', express.static(path.join(__dirname, '../pdfs')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rutas públicas
app.use('/api/auth', autenticacionRoutes);
app.use('/api/lugares', lugarRoutes);
app.use('/api/experiencias', experienciaRoutes);
app.use('/api/calificaciones', calificacionRoutes);

// Rutas protegidas (admin)
app.use('/api/admin', administradorRoutes);
app.use('/api/archivos', archivosRoutes);

// Ruta de salud
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Servidor Tahitic funcionando',
    env: process.env.NODE_ENV,
    googleOAuth: !!process.env.GOOGLE_CLIENT_ID
  });
});

// Inicialización
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log('=== ✅ Variables de Entorno Cargadas ===');
  console.log('🌐 Puerto:', process.env.PORT);
  console.log('🗄️  BD:', process.env.DB_NAME);
  console.log('🔐 JWT:', process.env.JWT_SECRET ? '✅ Configurado' : '❌ Faltante');
  console.log('📧 Admin:', process.env.ADMIN_EMAIL);
  console.log('🔑 Google Client ID:', process.env.GOOGLE_CLIENT_ID ? '✅' : '❌ Faltante');
  console.log('🚀 Servidor ejecutándose en puerto', PORT);
});