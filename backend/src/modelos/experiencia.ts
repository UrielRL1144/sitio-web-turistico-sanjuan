//modelos/experiencia.ts
export interface Experiencia {
  id: string;
  url_foto: string;
  descripcion?: string;
  creado_en: Date;
  ruta_almacenamiento: string;
  estado: 'pendiente' | 'aprobado' | 'rechazado';
  puntuacion_moderacion: number;
  categorias_moderacion?: any;
  contador_vistas: number;
  lugar_id?: string;
  ancho_imagen?: number;
  alto_imagen?: number;
  tamaño_archivo?: number;
  tipo_archivo?: string;
  busqueda_segura_adulto?: string;
  busqueda_segura_violencia?: string;
  busqueda_segura_provocativo?: string;
  banderas_moderacion_texto?: any;
}

export interface ExperienciaRequest {
  descripcion?: string;
  lugarId?: string;
}

export interface ExperienciaConLugar extends Experiencia {
  lugar_nombre?: string;
  lugar_ubicacion?: string;
}

export interface EstadisticasExperiencias {
  por_estado: Array<{
    estado: string;
    cantidad: number;
    total_vistas: number;
  }>;
  total: number;
  total_vistas: number;
}