// hooks/useAdminPlaces.ts - VERSIÓN CORREGIDA
import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import api from '@/lib/axios';

export interface Place {
  id: string;
  name: string;
  description: string;
  location: string;
  category: string;
  image_url: string;
  pdf_url: string;
  average_rating: number;
  total_ratings: number;
  total_experiences: number;
  created_at: string;
  updated_at: string;
}

// Interface para la API (nombres en español)
interface ApiPlace {
  id: string;
  nombre: string;
  descripcion: string;
  ubicacion: string;
  categoria: string;
  foto_principal_url: string;
  pdf_url: string;
  puntuacion_promedio: number;
  total_calificaciones: number;
  total_experiencias: number;
  creado_en: string;
  actualizado_en: string;
}

interface PlaceFormData {
  name: string;
  description: string;
  location: string;
  category: string;
  image_url?: string;
  pdf_url?: string;
}

export const useAdminPlaces = () => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Función para mapear datos de la API al formato del frontend
  const mapApiPlaceToPlace = (apiPlace: ApiPlace): Place => ({
    id: apiPlace.id,
    name: apiPlace.nombre,
    description: apiPlace.descripcion,
    location: apiPlace.ubicacion,
    category: apiPlace.categoria,
    image_url: apiPlace.foto_principal_url || '',
    pdf_url: apiPlace.pdf_url || '',
    average_rating: apiPlace.puntuacion_promedio ? Number(apiPlace.puntuacion_promedio) : 0,
    total_ratings: apiPlace.total_calificaciones ? Number(apiPlace.total_calificaciones) : 0,
    total_experiences: apiPlace.total_experiencias ? Number(apiPlace.total_experiencias) : 0,
    created_at: apiPlace.creado_en,
    updated_at: apiPlace.actualizado_en
  });

  // Función para mapear datos del frontend a la API
  const mapPlaceToApiData = (placeData: PlaceFormData | Partial<PlaceFormData>) => ({
    nombre: placeData.name,
    descripcion: placeData.description,
    ubicacion: placeData.location,
    categoria: placeData.category,
    foto_principal_url: placeData.image_url,
    pdf_url: placeData.pdf_url
  });

  /**
   * Obtener todos los lugares
   */
  const fetchPlaces = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.get<{ lugares: ApiPlace[] }>('/api/lugares');
      const placesData = response.data.lugares || [];
      
      const parsedPlaces = placesData.map(mapApiPlaceToPlace);
      setPlaces(parsedPlaces);
      
      return parsedPlaces;
    } catch (err: any) {
      const errorMessage = err?.response?.data?.error || err?.message || 'Error al cargar los lugares';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Crear un nuevo lugar
   */
  const createPlace = useCallback(async (placeData: PlaceFormData) => {
    try {
      setLoading(true);
      setError(null);

      // Validar datos requeridos
      if (!placeData.name?.trim()) {
        throw new Error('El nombre del lugar es requerido');
      }
      
      if (!placeData.description?.trim()) {
        throw new Error('La descripción del lugar es requerida');
      }

      if (!placeData.location?.trim()) {
        throw new Error('La ubicación del lugar es requerida');
      }

      if (!placeData.category?.trim()) {
        throw new Error('La categoría del lugar es requerida');
      }

      // Mapear datos al formato de la API
      const apiData = mapPlaceToApiData(placeData);
      
      const response = await api.post<{ 
        mensaje: string; 
        lugar: ApiPlace 
      }>('/api/lugares', apiData);
      
      if (!response.data.lugar) {
        throw new Error('No se recibió el lugar creado del servidor');
      }
      
      const newPlace = mapApiPlaceToPlace(response.data.lugar);
      
      // Actualizar la lista de lugares
      setPlaces(prevPlaces => [...prevPlaces, newPlace]);
      
      toast({
        title: '✅ Lugar creado',
        description: 'El lugar se ha creado exitosamente',
      });
      
      return newPlace;
    } catch (err: any) {
      const errorMessage = err?.response?.data?.error || err?.message || 'Error al crear el lugar';
      setError(errorMessage);
      
      toast({
        title: '❌ Error',
        description: errorMessage,
        variant: 'destructive',
      });
      
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [toast]);

  /**
   * Actualizar un lugar existente
   */
  const updatePlace = useCallback(async (placeId: string, placeData: Partial<PlaceFormData>) => {
    try {
      setLoading(true);
      setError(null);

      // Mapear datos al formato de la API
      const apiData = mapPlaceToApiData(placeData);

      const response = await api.put<{ 
        mensaje: string; 
        lugar: ApiPlace 
      }>(`/api/lugares/${placeId}`, apiData);
      
      if (!response.data.lugar) {
        throw new Error('No se recibió el lugar actualizado del servidor');
      }
      
      const updatedPlace = mapApiPlaceToPlace(response.data.lugar);
      
      // Actualizar la lista de lugares
      setPlaces(prevPlaces => 
        prevPlaces.map(place => 
          place.id === placeId ? updatedPlace : place
        )
      );
      
      toast({
        title: '✅ Lugar actualizado',
        description: 'El lugar se ha actualizado exitosamente',
      });
      
      return updatedPlace;
    } catch (err: any) {
      const errorMessage = err?.response?.data?.error || err?.message || 'Error al actualizar el lugar';
      setError(errorMessage);
      
      toast({
        title: '❌ Error',
        description: errorMessage,
        variant: 'destructive',
      });
      
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [toast]);

  /**
   * Eliminar un lugar
   */
  const deletePlace = useCallback(async (placeId: string) => {
    try {
      setLoading(true);
      setError(null);

      await api.delete<{ mensaje: string }>(`/api/lugares/${placeId}`);
      
      // Actualizar la lista de lugares
      setPlaces(prevPlaces => prevPlaces.filter(place => place.id !== placeId));
      
      toast({
        title: '✅ Lugar eliminado',
        description: 'El lugar se ha eliminado exitosamente',
      });
      
      return true;
    } catch (err: any) {
      const errorMessage = err?.response?.data?.error || err?.message || 'Error al eliminar el lugar';
      setError(errorMessage);
      
      toast({
        title: '❌ Error',
        description: errorMessage,
        variant: 'destructive',
      });
      
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [toast]);

  /**
   * Subir imagen de un lugar - CORREGIDA
   */
  const uploadPlaceImage = useCallback(async (placeId: string, imageFile: File) => {
    try {
      const formData = new FormData();
      formData.append('imagen', imageFile);

      const response = await api.post<{ 
        mensaje: string;
        url_imagen: string;
      }>(`/api/lugares/${placeId}/imagen`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Actualizar el lugar con la nueva URL de imagen
      await updatePlace(placeId, { image_url: response.data.url_imagen });

      toast({
        title: '✅ Imagen subida',
        description: 'La imagen se ha subido exitosamente',
      });

      return response.data;
    } catch (err: any) {
      const errorMessage = err?.response?.data?.error || err?.message || 'Error al subir la imagen';
      
      toast({
        title: '❌ Error',
        description: errorMessage,
        variant: 'destructive',
      });
      
      throw new Error(errorMessage);
    }
  }, [updatePlace, toast]);

  /**
 * Subir múltiples imágenes a la galería de un lugar
 */
const uploadMultipleImages = useCallback(async (placeId: string, imageFiles: File[]) => {
  try {
    const formData = new FormData();
    imageFiles.forEach((file, index) => {
      formData.append('imagenes', file);
    });

    const response = await api.post<{ 
      mensaje: string;
      imagenes: Array<{ url: string; orden: number }>;
    }>(`/api/lugares/${placeId}/imagenes`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    toast({
      title: '✅ Imágenes subidas',
      description: `${imageFiles.length} imágenes agregadas a la galería`,
    });

    return response.data;
  } catch (err: any) {
    const errorMessage = err?.response?.data?.error || err?.message || 'Error al subir imágenes';
    
    toast({
      title: '❌ Error',
      description: errorMessage,
      variant: 'destructive',
    });
    
    throw new Error(errorMessage);
  }
}, [toast]);

/**
 * Obtener galería de imágenes de un lugar
 */
const getGallery = useCallback(async (placeId: string) => {
  try {
    const response = await api.get<{ 
      imagenes: Array<{
        id: string;
        url_foto: string;
        descripcion: string;
        es_principal: boolean;
        orden: number;
      }>;
    }>(`/api/lugares/${placeId}/galeria`);

    return response.data.imagenes;
  } catch (err: any) {
    const errorMessage = err?.response?.data?.error || err?.message || 'Error al obtener galería';
    throw new Error(errorMessage);
  }
}, []);

/**
 * Eliminar imagen de la galería
 */
const deleteGalleryImage = useCallback(async (placeId: string, imageId: string) => {
  try {
    await api.delete(`/api/lugares/${placeId}/galeria/${imageId}`);
    
    toast({
      title: '✅ Imagen eliminada',
      description: 'La imagen ha sido eliminada de la galería',
    });
    
    return true;
  } catch (err: any) {
    const errorMessage = err?.response?.data?.error || err?.message || 'Error al eliminar imagen';
    
    toast({
      title: '❌ Error',
      description: errorMessage,
      variant: 'destructive',
    });
    
    throw new Error(errorMessage);
  }
}, [toast]);

/**
 * Establecer imagen como principal
 */
const setMainImage = useCallback(async (placeId: string, imageId: string) => {
  try {
    await api.put(`/api/lugares/${placeId}/galeria/${imageId}/principal`);
    
    // Actualizar la lista de lugares para reflejar el cambio
    await fetchPlaces();
    
    toast({
      title: '✅ Imagen principal actualizada',
      description: 'La imagen se ha establecido como principal',
    });
    
    return true;
  } catch (err: any) {
    const errorMessage = err?.response?.data?.error || err?.message || 'Error al establecer imagen principal';
    
    toast({
      title: '❌ Error',
      description: errorMessage,
      variant: 'destructive',
    });
    
    throw new Error(errorMessage);
  }
}, [fetchPlaces, toast]);

  /**
   * Subir PDF de un lugar - CORREGIDA
   */
  const uploadPlacePDF = useCallback(async (placeId: string, pdfFile: File) => {
    try {
      const formData = new FormData();
      formData.append('pdf', pdfFile);

      const response = await api.post<{ 
        mensaje: string;
        url_pdf: string;
      }>(`/api/lugares/${placeId}/pdf`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Actualizar el lugar con la nueva URL del PDF
      await updatePlace(placeId, { pdf_url: response.data.url_pdf });

      toast({
        title: '✅ PDF subido',
        description: 'El PDF se ha subido exitosamente',
      });

      return response.data;
    } catch (err: any) {
      const errorMessage = err?.response?.data?.error || err?.message || 'Error al subir el PDF';
      
      toast({
        title: '❌ Error',
        description: errorMessage,
        variant: 'destructive',
      });
      
      throw new Error(errorMessage);
    }
  }, [updatePlace, toast]);

  // Función para limpiar errores
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    places,
    loading,
    error,
    createPlace,
    updatePlace,
    deletePlace,
    uploadPlaceImage,
    uploadMultipleImages,
    getGallery,
    deleteGalleryImage,
    setMainImage,
    fetchPlaces,
    uploadPlacePDF,
    refetch: fetchPlaces,
    clearError,
  };
};