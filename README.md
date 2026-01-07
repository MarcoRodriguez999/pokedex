# Pokédex

Una aplicación web moderna para explorar y buscar información sobre Pokémon. Desarrollada con React, TypeScript y Vite, ofrece una experiencia de usuario rápida y fluida con estilos modernos gracias a Tailwind CSS.

## Características

- **Búsqueda de Pokémon**: Filtra y busca tus Pokémon favoritos en tiempo real
- **Vista detallada**: Accede a información completa de cada Pokémon
- **Interfaz responsiva**: Diseño adaptable a diferentes tamaños de pantalla
- **Rendimiento optimizado**: Construcción con Vite para carga rápida
- **Type-safe**: Desarrollado con TypeScript para mayor seguridad de tipos

## Stack Tecnológico

- **React 19**: Framework UI moderna
- **TypeScript**: Tipado estático para JavaScript
- **Vite 7**: Build tool rápido y moderno
- **React Router DOM 7**: Enrutamiento entre páginas
- **Tailwind CSS 4**: Utilidades CSS para diseño
- **ESLint**: Linting y análisis de código

## Requisitos Previos

- Node.js (versión 16 o superior)
- npm o yarn

## Instalación y Uso

### 1. Clonar el repositorio

```bash
git clone [URL_del_repositorio]
cd pokedex
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Ejecutar en desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### 4. Construir para producción

```bash
npm run build
```

### 5. Vista previa de producción

```bash
npm run preview
```

### 6. Lint del código

```bash
npm run lint
```

## Estructura del Proyecto

```
src/
├── components/           # Componentes React
│   ├── home.tsx         # Página principal con búsqueda
│   └── pokemonview.tsx  # Vista detallada del Pokémon
├── context/             # Contexto de React
│   └── pokemonContext.tsx # Estado global de Pokémon
├── assets/              # Recursos estáticos
├── App.tsx              # Componente principal
├── main.tsx             # Punto de entrada
├── index.css            # Estilos globales
└── vite-env.d.ts        # Tipos de Vite
```

## Configuración

- **TypeScript**: Configurado en `tsconfig.json`
- **Vite**: Configurado en `vite.config.ts`
- **ESLint**: Configurado en `eslint.config.js`

## Componentes Principales

### Home (`home.tsx`)

Página de inicio donde puedes:

- Buscar Pokémon por nombre
- Ver lista filtrada de resultados
- Navegar a la vista detallada

### PokemonView (`pokemonview.tsx`)

Página de detalles que muestra:

- Información completa del Pokémon
- Estadísticas y atributos
- Navegación de vuelta a la lista

## Datos

Los datos de Pokémon se obtienen a través de la [PokéAPI](https://pokeapi.co/), una API REST abierta y gratuita con información completa sobre Pokémon.

## Desarrollador

Proyecto personal de exploración y práctica con React, TypeScript y Vite.

## Licencia

Este proyecto es de código abierto bajo la licencia MIT.
