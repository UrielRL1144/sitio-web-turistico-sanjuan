// ServiciosSection.tsx
import { useRef, useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, Filter, Search, Grid3X3, List } from 'lucide-react';
import productsData from '../archivos_data/cooperativa-products.json';
import { ProductCard } from '../comunidad/section-servicios/ProductCard';
import { ProductDetail } from '../comunidad/section-servicios/ProductDetail';
import { useNavigate } from "react-router-dom"; 

// tipos.ts o arriba en tu archivo
export interface Product {
  id: string;
  name: string;
  tag: string;
  category: string;
  mainImage: string;
  galleryImages: string[];
  story: string;
  description: string;
  materials: { icon: string; text: string }[];
  features: string[];
  price?: number;
  unit?: string;
  variants?: { name: string; price: number }[];
  available: boolean;
  stock: number;
  seasonal: boolean;
  highlight: boolean;
  color: string;
  producer: string;
  process: string;
}


export function ServiciosSection() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(productsData);
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const navigate = useNavigate();
  const gridRef = useRef<HTMLDivElement>(null);

  // Obtener categorías únicas
  const categories = ['todos', ...new Set(productsData.map(product => product.category))];

  // Filtrar productos
  useEffect(() => {
    let filtered = productsData;

    // Filtrar por categoría
    if (selectedCategory !== 'todos') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filtrar por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.tag.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, searchTerm]);

  // Reset scroll cuando se selecciona un producto
  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProduct]);

  return (
    <section id="servicios" className="relative bg-gradient-to-b from-emerald-50 to-stone-50">
      {/* Contenido Principal */}
      <div ref={gridRef} className="max-w-7xl mx-auto py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        
        {/* Botón de regresar (solo cuando no hay producto seleccionado) */}
        {!selectedProduct && (
          <div className="mb-8">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/80 backdrop-blur-sm border border-emerald-200 text-emerald-700 font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <ArrowLeft className="h-5 w-5" />
              Regresar
            </button>
          </div>
        )}

        {/* Controles de Filtro y Búsqueda */}
        {!selectedProduct && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            {/* Encabezado */}
            <div className="text-center mb-8">
              <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
                Nuestra <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Colección</span>
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Descubre los tesoros que nacen del trabajo conjunto y el amor por nuestra tierra
              </p>
            </div>

            {/* Barra de controles */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-emerald-100">
              <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                {/* Búsqueda */}
                <div className="flex-1 w-full lg:max-w-md">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Buscar productos..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Filtros */}
                <div className="flex flex-wrap gap-3 items-center">
                  {/* Selector de categorías */}
                  <div className="relative">
                    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="pl-10 pr-8 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 appearance-none bg-white cursor-pointer transition-all duration-300"
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>
                          {category === 'todos' ? 'Todas las categorías' : 
                           category.charAt(0).toUpperCase() + category.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Selector de vista */}
                  <div className="flex bg-gray-100 rounded-xl p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-lg transition-all duration-300 ${
                        viewMode === 'grid' 
                          ? 'bg-white text-emerald-600 shadow-sm' 
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <Grid3X3 className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-lg transition-all duration-300 ${
                        viewMode === 'list' 
                          ? 'bg-white text-emerald-600 shadow-sm' 
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <List className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Contador de resultados */}
              <div className="mt-4 text-center lg:text-left">
                <p className="text-sm text-gray-600">
                  Mostrando <span className="font-semibold text-emerald-600">{filteredProducts.length}</span> de{' '}
                  <span className="font-semibold">{productsData.length}</span> productos
                  {selectedCategory !== 'todos' && (
                    <span> en <span className="font-semibold text-emerald-600">{selectedCategory}</span></span>
                  )}
                  {searchTerm && (
                    <span> para "<span className="font-semibold text-emerald-600">{searchTerm}</span>"</span>
                  )}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Cuadrícula de Productos */}
        {!selectedProduct && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.1 } }
            }}
          >
            {filteredProducts.length > 0 ? (
              <div className={`
                ${viewMode === 'grid' 
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8' 
                  : 'space-y-6 max-w-4xl mx-auto'
                }
              `}>
                {filteredProducts.map((product, index) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onSelect={() => setSelectedProduct(product)}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              /* Estado vacío */
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16"
              >
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 max-w-md mx-auto border border-emerald-100 shadow-lg">
                  <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">No se encontraron productos</h3>
                  <p className="text-gray-600 mb-6">
                    Intenta con otros términos de búsqueda o cambia los filtros
                  </p>
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('todos');
                    }}
                    className="bg-emerald-500 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-emerald-600 transition-colors duration-300"
                  >
                    Mostrar todos los productos
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Vista Detallada del Producto */}
        <AnimatePresence>
          {selectedProduct && (
            <ProductDetail 
              product={selectedProduct} 
              onClose={() => setSelectedProduct(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}