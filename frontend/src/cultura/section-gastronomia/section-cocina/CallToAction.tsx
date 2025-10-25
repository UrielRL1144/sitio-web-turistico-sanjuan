import { motion } from 'framer-motion';
import { Sparkles, Home, Phone, Mail } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface CallToActionProps {
  cocina: any;
}

export function CallToAction({ cocina }: CallToActionProps) {
  return (
    <section className="bg-gradient-to-r from-amber-600 via-amber-700 to-orange-700 text-white py-12 sm:py-16 lg:py-20 xl:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute top-0 right-0 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-amber-400/20 rounded-full -translate-y-16 sm:-translate-y-24 lg:-translate-y-32 translate-x-16 sm:translate-x-24 lg:translate-x-32"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 sm:w-36 sm:h-36 lg:w-48 lg:h-48 bg-orange-400/20 rounded-full translate-y-12 sm:translate-y-18 lg:translate-y-24 -translate-x-12 sm:-translate-x-18 lg:-translate-x-24"></div>
      
      <div className="relative max-w-4xl mx-auto text-center px-3 sm:px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-6 sm:mb-8"
        >
          <Sparkles className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 mx-auto mb-4 sm:mb-6 text-amber-300" />
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 sm:mb-6 px-2">
            ¿Listo para una Experiencia Inolvidable?
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg sm:text-xl lg:text-2xl mb-6 sm:mb-8 opacity-90 font-light px-2"
          >
            Te esperamos para compartir lo mejor de nuestra tradición culinaria
          </motion.p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-2"
        >
          <Card className="group bg-white text-amber-900 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base lg:text-lg hover:bg-amber-100 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 flex items-center space-x-2 w-full sm:w-auto justify-center">
            <Home className="h-4 w-4 sm:h-5 sm:w-5" />
            <span>Visitanos</span>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 sm:mt-10 lg:mt-12 flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-6 lg:space-x-8 text-amber-200 text-sm sm:text-base"
        >
          <div className="flex items-center space-x-2">
            <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="font-semibold">{cocina.contacto.telefono}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="font-semibold break-all">{cocina.contacto.correo}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}