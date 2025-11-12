import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, MessageCircle, X, MapPin, Leaf, Music, Mountain } from "lucide-react";

// Definimos los tipos para las props y las quick replies
interface QuickReply {
  text: string;
  action: "navigate" | "question";
  target: string;
  description?: string;
}

interface Message {
  sender: "user" | "bot";
  text: string;
  quickReplies?: QuickReply[];
}

interface CustomChatbotProps {
  onNavigate?: (path: string) => void;
}

// Opciones de navegación
const navigationOptions: QuickReply[] = [
  {
    text: "🏞️ Turismo y Atracciones",
    action: "navigate",
    target: "/turismo",
    description: "Descubre cascadas, senderos y paisajes únicos"
  },
  {
    text: "🎭 Cultura y Tradiciones", 
    action: "navigate",
    target: "/cultura",
    description: "Danzas ancestrales, calendario cultural y arte"
  },
  {
    text: "👥 Comunidad Local",
    action: "navigate",
    target: "/comunidad", 
    description: "Conoce nuestra gente y proyectos comunitarios"
  },
  {
    text: "🍽️ Gastronomía",
    action: "navigate",
    target: "/section-gastronomia",
    description: "Sabores tradicionales y cocina local"
  },
  {
    text: "📞 Contacto",
    action: "navigate",
    target: "/contacto",
    description: "Cómo visitarnos y información de contacto"
  },
  {
    text: "🛍️ Cooperativa",
    action: "navigate",
    target: "/section-cooperativa",
    description: "Productos locales y artesanías"
  },
  {
    text: "📅 Calendario Cultural",
    action: "navigate",
    target: "/calendario-cultural",
    description: "Eventos y festividades tradicionales"
  },
  {
    text: "🖼️ Galería",
    action: "navigate",
    target: "/galeria",
    description: "Imágenes y videos de nuestra tierra"
  }
];

export const CustomChatbot: React.FC<CustomChatbotProps> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "🌿 **¡Bienvenido/a a San Juan Tahitic!** 🌄\n\n*Donde la naturaleza y la cultura se encuentran* ✨\n\nSoy tu guía virtual. ¿Te gustaría explorar alguna área específica de nuestro paraíso? \n\n Puedes hacer clic en algunos de nuetros siguientes botones directos a la sección de nuestro sitio web, o puedes preguntarnos con palabras claves para saber algo en particular es decir **Cascadas**, **Danzas**, **Cooperaiva**, *Subir foto*, lo que necesites ",
      quickReplies: navigationOptions
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const lastMessageCountRef = useRef(messages.length);

  // Scroll inteligente - solo al final si el usuario ya estaba abajo
  const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
    if (messagesContainerRef.current) {
      const container = messagesContainerRef.current;
      const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 100;
      
      if (isNearBottom) {
        messagesEndRef.current?.scrollIntoView({ behavior });
      }
    }
  };

  // Efecto para scroll inteligente
  // Efecto para scroll inteligente - VERSIÓN MÁS SIMPLE
useEffect(() => {
  const isNewMessage = messages.length > lastMessageCountRef.current;
  
  if (isNewMessage) {
    setTimeout(() => {
      if (messagesContainerRef.current) {
        const container = messagesContainerRef.current;
        const lastMessage = messages[messages.length - 1];
        
        if (lastMessage.sender === "user") {
          // Usuario: scroll al final
          container.scrollTop = container.scrollHeight;
        } else {
          // Bot: mantener posición actual O hacer scroll mínimo
          // Esto hace que se vea el inicio del mensaje del bot
          const currentPosition = container.scrollTop;
          const newPosition = Math.min(
            currentPosition + 100, // Solo baja 100px
            container.scrollHeight - container.clientHeight
          );
          container.scrollTo({
            top: newPosition,
            behavior: "smooth"
          });
        }
      }
    }, 100);
    
    lastMessageCountRef.current = messages.length;
  }
}, [messages]);

  // Manejar las quick replies (botones de acción rápida)
  const handleQuickReply = (reply: QuickReply) => {
    if (reply.action === "navigate" && onNavigate) {
      // Agregar mensaje del usuario (simulado)
      setMessages(prev => [...prev, {
        sender: "user",
        text: reply.text
      }]);
      
      // Mensaje de confirmación del bot
      const confirmationMessage = `¡Excelente elección! 🎯\n\nTe estoy llevando a **${reply.text.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '')}**...\n\n*Navegando...* ✨`;
      
      setMessages(prev => [...prev, {
        sender: "bot",
        text: confirmationMessage
      }]);
      
      // Navegación después de un breve delay para que se vea el mensaje
      setTimeout(() => {
        onNavigate(reply.target);
        // Cerrar el chat después de navegar (opcional)
        // setIsOpen(false);
      }, 2000);
      
    } else if (reply.action === "question") {
      // Para preguntas predefinidas
      setInput(reply.target);
      setTimeout(() => handleSend(), 100);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { sender: "user", text: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: input.trim(),
          sessionId: "visitante123",
          languageCode: "es",
        }),
      });

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: data.reply },
      ]);
    } catch (error) {
      console.error("Error comunicando con backend:", error);
      setMessages((prev) => [
        ...prev,
        { 
          sender: "bot", 
          text: "🌿 *Nuestros guías espirituales están descansando...*\n\nPor favor, intenta nuevamente en unos momentos mientras conectamos con la energía de la naturaleza." 
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Sugerencias temáticas para preguntas específicas
  const quickSuggestions = [
    {
      text: "¿Qué cascadas recomiendan visitar?",
      icon: "💧"
    },
    {
      text: "Horarios de danzas tradicionales",
      icon: "🎭"
    },
    {
      text: "Tours por reservas naturales",
      icon: "🌳"
    },
    {
      text: "Cultura y tradiciones locales",
      icon: "📜"
    }
  ];

  return (
    <>
      {/* Botón flotante más pequeño */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-gradient-to-br from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white p-4 rounded-full shadow-2xl transition-all z-50 flex items-center justify-center group border-2 border-emerald-400"
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        style={{
          background: "linear-gradient(135deg, #059669 0%, #0f766e 100%)",
          boxShadow: "0 8px 32px rgba(5, 150, 105, 0.3)"
        }}
      >
        {isOpen ? (
          <X size={24} className="group-hover:rotate-90 transition-transform" />
        ) : (
          <MessageCircle size={24} className="group-hover:scale-110 transition-transform" />
        )}
        {/* Notificación pulsante */}
        {!isOpen && (
          <motion.div
            className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full border-2 border-white"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </motion.button>

      {/* Ventana del chat más ancha y adaptable */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-20 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border-2 border-emerald-200 z-40
                      sm:w-[420px] sm:h-[520px] md:w-[440px]"
            style={{
              background: "linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%)",
              boxShadow: "0 20px 60px rgba(5, 150, 105, 0.2)"
            }}
          >
            {/* Encabezado compacto */}
            <div 
              className="px-4 py-3 text-white font-semibold flex justify-between items-center relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #059669 0%, #0d9488 50%, #0f766e 100%)"
              }}
            >
              {/* Elementos decorativos */}
              <div className="absolute inset-0 opacity-10">
                <Leaf className="absolute top-1 left-4" size={16} />
                <Music className="absolute bottom-1 right-8" size={12} />
                <Mountain className="absolute top-2 right-4" size={14} />
              </div>
              
              <div className="flex items-center z-10">
                <div className="bg-white/20 p-1.5 rounded-full mr-2">
                  <MapPin size={16} className="text-white" />
                </div>
                <div>
                  <span className="text-base block leading-tight">San Juan Tahitic</span>
                  <span className="text-xs font-normal opacity-90 flex items-center">
                    <div className="w-1.5 h-1.5 bg-amber-400 rounded-full mr-1"></div>
                    Guía de Navegación
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/20 p-1 rounded-full transition z-10"
              >
                <X size={18} />
              </button>
            </div>

            {/* Área de mensajes más ancha */}
            <div 
              ref={messagesContainerRef}
              className="flex-1 overflow-y-auto p-4 space-y-3 bg-gradient-to-b from-emerald-50/50 to-teal-50/30"
              style={{ 
                maxHeight: "calc(100% - 120px)",
                scrollBehavior: "smooth"
              }}
            >
              {messages.map((msg, i) => (
                <div key={i}>
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${
                      msg.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div className={`flex ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"} items-end space-x-2 max-w-[95%]`}>
                      {/* Avatar más pequeño */}
                      <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                        msg.sender === "user" 
                          ? "bg-gradient-to-br from-blue-500 to-indigo-600 ml-1" 
                          : "bg-gradient-to-br from-emerald-500 to-teal-600 mr-1"
                      }`}>
                        {msg.sender === "user" ? (
                          <span className="text-white text-[10px]">TÚ</span>
                        ) : (
                          <Leaf size={12} className="text-white" />
                        )}
                      </div>
                      
                      {/* Burbuja de mensaje más ancha */}
                      <motion.div
                        className={`relative px-4 py-3 rounded-xl max-w-full min-w-[120px] ${
                          msg.sender === "user"
                            ? "bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-br-none shadow-md"
                            : "bg-white border border-emerald-100 text-gray-800 rounded-bl-none shadow-sm"
                        }`}
                      >
                        <div
                          className="whitespace-pre-wrap leading-relaxed text-sm"
                          style={{ lineHeight: '1.5' }}
                          dangerouslySetInnerHTML={{
                            __html: msg.text
                              .replace(/\*\*(.*?)\*\*/g, "<strong class='font-semibold'>$1</strong>")
                              .replace(/\n/g, "<br />")
                              .replace(/\*(.*?)\*/g, "<em class='italic text-opacity-90'>$1</em>"),
                          }}
                        />
                        
                        {/* Indicador de escritura solo cuando está cargando */}
                        {isLoading && i === messages.length - 1 && msg.sender === "user" && (
                          <motion.div 
                            className="flex space-x-1 mt-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                          >
                            <span className="text-xs text-emerald-600 italic">Nuestro guía está respondiendo...</span>
                          </motion.div>
                        )}
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Quick Replies (Botones de acción) */}
                  {msg.quickReplies && msg.quickReplies.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="mt-3 ml-10"
                    >
                      <div className="grid grid-cols-1 gap-2">
                        {msg.quickReplies.map((reply, index) => (
                          <motion.button
                            key={index}
                            onClick={() => handleQuickReply(reply)}
                            className="text-sm bg-stone-300 hover:bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-full transition-all duration-200 text-left group hover:shadow-md hover:border-emerald-300 hover:scale-[1.02]"
                            whileHover={{ x: 3 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="font-medium">{reply.text}</div>
                            {reply.description && (
                              <div className="text-xs text-emerald-600 mt-1 opacity-80">
                                {reply.description}
                              </div>
                            )}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              ))}
              
              {/* Referencia para scroll automático */}
              <div ref={messagesEndRef} />
              
              {/* Sugerencias rápidas para preguntas (solo si no hay quick replies activas) */}
              {messages.length === 1 && !messages[0].quickReplies && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-4"
                >
                  <p className="text-xs text-emerald-700 mb-3 font-medium text-center">
                    💫 También puedes preguntar sobre:
                  </p>
                  <div className="grid grid-cols-1 gap-2">
                    {quickSuggestions.map((suggestion, index) => (
                      <motion.button
                        key={index}
                        onClick={() => {
                          setInput(suggestion.text);
                          setTimeout(() => handleSend(), 100);
                        }}
                        className="text-sm bg-white hover:bg-emerald-50 border border-emerald-200 text-emerald-800 px-3 py-2.5 rounded-lg transition-all duration-200 text-left group hover:shadow-sm hover:border-emerald-300"
                        whileHover={{ x: 3 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="mr-2">{suggestion.icon}</span>
                        {suggestion.text}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Campo de entrada más ancho */}
            <div className="p-3 border-t border-emerald-200 bg-white/80 backdrop-blur-sm">
              <div className="flex items-center space-x-2">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    className="w-full border border-emerald-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-200 text-sm bg-white transition-all duration-200"
                    placeholder="Escribe tu mensaje o elige una sección arriba..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    disabled={isLoading}
                  />
                  {isLoading && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <motion.div
                        className="flex space-x-1"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                        <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                        <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                      </motion.div>
                    </div>
                  )}
                </div>
                <motion.button
                  onClick={handleSend}
                  className="bg-gradient-to-br from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white p-2.5 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex-shrink-0"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={!input.trim() || isLoading}
                  style={{ width: '44px', height: '44px' }}
                >
                  <Send size={16} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};