# 🎮 Dashboard Pokémon

Una aplicación web moderna y interactiva para explorar el mundo de Pokémon, construida con Next.js 15, React 19, TypeScript y Tailwind CSS.

## ✨ Características

### 🔍 Búsqueda y Filtrado Avanzado
- **Búsqueda en tiempo real** por nombre de Pokémon
- **Filtros por tipo** con selección múltiple
- **Filtros avanzados** por estadísticas, altura, peso y experiencia
- **Indicadores visuales** de filtros activos
- **Limpieza rápida** de todos los filtros

### 🎨 Interfaz Moderna y Animada
- **Animaciones fluidas** con Framer Motion
- **Diseño responsivo** optimizado para móviles y desktop
- **Fondo animado** con efectos visuales
- **Tarjetas de Pokémon mejoradas** con efectos hover
- **Carga progresiva** con skeletons animados
- **Transiciones suaves** entre páginas

### 📊 Visualización de Datos
- **Estadísticas detalladas** de cada Pokémon
- **Tipos de Pokémon** con colores distintivos
- **Habilidades** con indicadores de rareza
- **Información de especies** completa
- **Gráficos de estadísticas** interactivos

### 🚀 Rendimiento Optimizado
- **React Query** para gestión de estado del servidor
- **Caché inteligente** de datos de la API
- **Paginación eficiente** con carga bajo demanda
- **Optimización de imágenes** automática
- **Lazy loading** de componentes

### 🎯 Funcionalidades Principales
- **Lista paginada** de todos los Pokémon
- **Vista detallada** de cada Pokémon individual
- **Sidebar colapsible** para filtros
- **Búsqueda global** con resultados instantáneos
- **Navegación intuitiva** entre páginas
- **Manejo de errores** robusto
- **Estados de carga** informativos

## 🛠️ Tecnologías Utilizadas

- **Next.js 15** - Framework de React con App Router
- **React 19** - Biblioteca de interfaz de usuario
- **TypeScript** - Tipado estático para JavaScript
- **Tailwind CSS 4** - Framework de CSS utilitario
- **Framer Motion** - Biblioteca de animaciones
- **TanStack Query** - Gestión de estado del servidor
- **Axios** - Cliente HTTP para API calls
- **ESLint** - Linter para JavaScript/TypeScript

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js 18+ 
- pnpm (recomendado) o npm

### Instalación

1. **Clona el repositorio**
```bash
git clone <repository-url>
cd dashboard-pokemon
```

2. **Instala las dependencias**
```bash
pnpm install
# o
npm install
```

3. **Ejecuta el servidor de desarrollo**
```bash
pnpm dev
# o
npm run dev
```

4. **Abre tu navegador**
Visita [http://localhost:3000](http://localhost:3000) para ver la aplicación.

## 📁 Estructura del Proyecto

```
src/
├── app/                    # App Router de Next.js
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Página de inicio
│   └── pokemon/[id]/      # Páginas dinámicas de Pokémon
├── components/            # Componentes reutilizables
│   ├── layout/           # Componentes de layout
│   ├── pokemon/          # Componentes específicos de Pokémon
│   ├── search/           # Componentes de búsqueda
│   ├── ui/               # Componentes de interfaz
│   └── providers/        # Providers de contexto
├── hooks/                # Custom hooks
├── lib/                  # Utilidades y configuración
│   ├── api.ts           # Cliente de API
│   ├── types.ts         # Definiciones de tipos
│   └── queryClient.ts   # Configuración de React Query
└── styles/              # Estilos globales
```

## 🔧 Scripts Disponibles

```bash
# Desarrollo
pnpm dev          # Inicia el servidor de desarrollo

# Producción
pnpm build        # Construye la aplicación para producción
pnpm start        # Inicia el servidor de producción

# Calidad de código
pnpm lint         # Ejecuta ESLint
```

## 🌐 API Utilizada

La aplicación utiliza la [PokéAPI](https://pokeapi.co/) para obtener datos de Pokémon:
- **Endpoint base**: `https://pokeapi.co/api/v2`
- **Datos incluidos**: Información completa de Pokémon, tipos, estadísticas, habilidades
- **Rate limiting**: La API tiene límites de uso, la aplicación incluye manejo de errores

## 🎨 Características de Diseño

### Paleta de Colores
- **Tipos de Pokémon**: Colores distintivos para cada tipo
- **Tema**: Diseño moderno con gradientes y efectos visuales
- **Accesibilidad**: Contraste optimizado y navegación por teclado

### Animaciones
- **Entrada escalonada** de tarjetas de Pokémon
- **Transiciones suaves** entre estados
- **Efectos hover** interactivos
- **Carga progresiva** con skeletons

## 🚀 Despliegue

### Vercel (Recomendado)
```bash
# Instala Vercel CLI
npm i -g vercel

# Despliega
vercel
```

### Otras plataformas
La aplicación es compatible con cualquier plataforma que soporte Next.js:
- **Netlify**
- **Railway**
- **Heroku**
- **Docker**

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🙏 Agradecimientos

- [PokéAPI](https://pokeapi.co/) por proporcionar la API gratuita
- [Next.js](https://nextjs.org/) por el framework
- [Tailwind CSS](https://tailwindcss.com/) por el sistema de diseño
- [Framer Motion](https://www.framer.com/motion/) por las animaciones
- [TanStack Query](https://tanstack.com/query) por la gestión de estado

---

**¡Disfruta explorando el mundo de Pokémon! 🎮✨**
