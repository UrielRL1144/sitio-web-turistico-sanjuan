# 🌿 Portal Web de San Juan Tahitic

![Estado del Proyecto](https://img.shields.io/badge/Estado-Producci%C3%B3n-success)
![React](https://img.shields.io/badge/Frontend-React-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/Language-TypeScript-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Styles-Tailwind_CSS-38B2AC?logo=tailwind-css)

## 📖 Descripción del Proyecto

Este repositorio contiene el **código fuente** de la plataforma digital oficial de **San Juan Tahitic**, Zacapoaxtla, Puebla. Este proyecto nació como una iniciativa de **residencia profesional** para digitalizar la oferta turística y cultural de la comunidad.

El objetivo es proporcionar una **interfaz moderna y fluida** que permita a los visitantes explorar la riqueza de la región, desde su gastronomía hasta sus tradiciones ancestrales, utilizando tecnologías de vanguardia para asegurar una **experiencia de usuario de alto nivel**.

## ✨ Características Principales

* **🚀 Experiencia Fluida:** Implementación de animaciones interactivas para una navegación inmersiva.
* **🎭 Sección Cultural Detallada:** Información curada sobre la historia, la **Danza de los Voladores** y festividades locales.
* **📍 Catálogo Turístico:** Guía de puntos de interés, rutas de acceso y servicios en la comunidad.
* **🏗️ Arquitectura Escalable:** Código organizado bajo estándares de ingeniería de software para facilitar su mantenimiento.
* **🔍 Optimización SEO:** Estructura pensada para mejorar la visibilidad de San Juan Tahitic en motores de búsqueda.

## 🛠️ Tecnologías Utilizadas

* **Core:** `React.js` con `TypeScript` para un desarrollo robusto y tipado.
* **Estilos:** `Tailwind CSS` para un diseño responsivo y utilitario.
* **Animaciones:** `Framer Motion` para transiciones suaves y dinámicas.
* **Mapas e Interacción:** Integración con `Google Maps API` para localización geográfica precisa.

## 🚀 Instalación y Uso Local

Para replicar el entorno de desarrollo localmente, sigue estos pasos:

1.  **Clona este repositorio:**
    ```bash
    git clone [https://github.com/UrielRL1144/san-juan-tahitic-web.git](https://github.com/UrielRL1144/san-juan-tahitic-web.git)
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
