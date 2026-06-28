## 🏛️ Portal Web Turístico de San Juan Tahitic

**Plataforma web** desarrollada como proyecto de residencia profesional para apoyar la difusión turística, cultural y comunitaria de San Juan Tahitic, Puebla.

> El objetivo del proyecto fue crear un sitio moderno, responsivo y fácil de navegar, donde visitantes y habitantes puedan consultar información sobre atractivos locales, cultura, eventos, gastronomía, ubicación y contenido multimedia de la comunidad.

---

### 🌍 Contexto del proyecto

San Juan Tahitic cuenta con riqueza cultural, natural y comunitaria, pero parte de esa información no siempre está organizada en un espacio digital accesible para visitantes o personas interesadas en conocer la localidad.

Este proyecto busca aportar una **herramienta digital** que ayude a presentar la comunidad de forma clara, visual y ordenada, fortaleciendo la difusión turística y cultural desde un sitio web.

---

### ⚡ Funcionalidades principales

* 🏠 **Portal de bienvenida:** Página de inicio con presentación visual inmersiva de la comunidad.
* 📖 **Secciones informativas:** Áreas dedicadas al turismo, cultura, comunidad y gastronomía.
* 🖼️ **Galería interactiva:** Espacio multimedia con imágenes y contenido visual destacado.
* 🌐 **Soporte multilingüe:** Implementación de idiomas en *Español*, *Inglés* y *Náhuatl*.
* 🗺️ **Geolocalización:** Integración de mapa interactivo para ubicación y puntos de interés.
* 📅 **Agenda comunitaria:** Calendario y sección dedicada a la difusión de eventos culturales.
* 🤖 **Asistente virtual:** Chatbot interactivo de apoyo impulsado por *DialogFlow*.
* 📱 **Diseño adaptativo:** Interfaz 100% responsiva para dispositivos móviles, tablets y escritorio.
* ⚙️ **Panel de control:** Funcionalidades de administración exclusivas para gestionar el contenido del sitio.
* 📈 **Optimización:** Mejoras básicas enfocadas en *SEO* y velocidad de carga en dispositivos móviles.

---

### 🛠️ Tecnologías utilizadas

* 🖥️ **Frontend:** `React` • `TypeScript` • `Vite` • `Tailwind CSS` • `Framer Motion` • `React Router DOM`
* ⚙️ **Backend:** `Node.js` • `Express.js` • `API REST`
* 🗄️ **Base de datos:** `PostgreSQL` • `SQL / PLpgSQL`
* ☁️ **Servicios e integraciones:** `Cloudinary` *(Multimedia)* • `DialogFlow` *(Chatbot)* • `Google Maps API` *(Ubicación)*
* 🚀 **Despliegue:** `Railway` • `Netlify`

---

### 🧠 Decisiones técnicas

* 📱 **Diseño responsivo (Mobile-First):** El sitio fue desarrollado desde su base para que pueda consultarse de manera fluida desde celulares, tablets y computadoras, priorizando la accesibilidad móvil.
* 🗣️ **Soporte multilingüe:** Se integró contenido en *Español*, *Inglés* y *Náhuatl* para ampliar el alcance internacional del sitio y, al mismo tiempo, representar y preservar la identidad cultural de la comunidad.
* ☁️ **Gestión multimedia descentralizada:** El proyecto utiliza servicios externos para manejar imágenes y contenido visual, evitando sobrecargar el repositorio y mejorando los tiempos de respuesta.
* 🤖 **Chatbot conversacional:** Se integró *DialogFlow* como un canal de soporte automatizado para responder preguntas frecuentes o guiar al usuario dentro de la plataforma.
* 📁 **Organización Full Stack:** El proyecto separa estrictamente el *frontend* del *backend* para mantener una estructura de código mucho más clara, escalable y facilitar su mantenimiento a futuro.

## 🚀 Instalación y Uso Local

Para replicar el entorno de desarrollo localmente, sigue estos pasos:

1.  **Clona este repositorio:**
    ```bash
    git clone [https://github.com/UrielRL1144/san-juan-tahitic-web.git](https://github.com/UrielRL1144/sitio-web-turistico-sanjuan.git)
    ```

2.  **Instala las dependencias:**
    ```bash
    npm install
    ```

3.  **Configura las variables de entorno:**
    Crea un archivo `.env` en la raíz del proyecto y añade tus llaves de API necesarias:
    ```env
    VITE_GOOGLE_MAPS_API_KEY=tu_llave_aqui
    ```

4.  **Inicia el proyecto en modo desarrollo:**
    ```bash
    npm run dev
    ```

## 📂 Estructura del Proyecto

```text
src/
├── components/       # Componentes reutilizables (Botones, Cards, Navbar)
├── assets/           # Imágenes, íconos y multimedia de la región
├── hooks/            # Lógica personalizada de React
├── pages/            # Vistas principales (Inicio, Cultura, Turismo)
└── styles/           # Configuraciones globales de Tailwind y CSS

## 📊 Estado del Proyecto

> 🟢 **Proyecto de Residencia Profesional.** 
> Cuenta con una arquitectura estructurada (*frontend/backend*) y funcionalidades orientadas a la difusión turística y cultural de San Juan Tahitic. Actualmente es una base sólida que puede seguir escalando y mejorándose en áreas de documentación, pruebas, accesibilidad, administración de contenido y optimización de rendimiento.

---

## 🎓 Qué Aprendí

* 🌍 **Desarrollo con impacto:** Creación de una plataforma web con un propósito real y tangible para una comunidad.
* 📁 **Arquitectura Full Stack:** Organización y estructuración de un proyecto separando claramente las responsabilidades entre el *frontend* y el *backend*.
* 🎨 **UI/UX y Maquetación:** Diseño e implementación de interfaces modernas y responsivas utilizando `React`, `TypeScript` y `Tailwind CSS`.
* 🌐 **Internacionalización:** Integración e implementación de contenido multilingüe dentro de una aplicación web.
* 🔌 **Integración de APIs:** Conexión y manejo de servicios externos clave como `Cloudinary`, `DialogFlow` y `Google Maps`.
* 🧩 **Desarrollo Modular:** Trabajo avanzado con enrutamiento, creación de componentes reutilizables y mantenimiento de una estructura modular limpia.
* 🚀 **Ingeniería de Software:** Aplicación de buenas prácticas enfocadas en el despliegue, documentación técnica y ciclos de mejora continua.
* 🤝 **Adaptabilidad Tecnológica:** Capacidad para traducir y adaptar una solución técnica a las necesidades específicas culturales, turísticas y comunitarias de un entorno real.

---

## 👨‍💻 Autor

**Uriel Ramos Lucio**
*Desarrollado como proyecto de residencia profesional para el Juzgado de Paz de San Juan Tahitic.*

* 🐙 **GitHub:** [@UrielRL1144](https://github.com/UrielRL1144)
* 💼 **LinkedIn:** [Uriel Ramos Lucio](https://www.linkedin.com/in/uriel-ramos-lucio)

