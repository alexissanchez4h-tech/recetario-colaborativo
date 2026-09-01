# 🍳 Recetario Colaborativo

Plataforma web que permite a los usuarios compartir y descubrir recetas de cocina de forma colaborativa. Los chefs pueden publicar sus recetas, mientras que los lectores pueden explorarlas y guardarlas como favoritas.

**Demo en vivo:** [https://recetario-colaborativo.vercel.app](https://recetario-colaborativo.vercel.app) (Reemplaza con tu URL de Vercel)

---

## 📸 Capturas de pantalla

### Página Principal
![Página Principal](./public/screenshots/home.png)

### Explorar Recetas
![Explorar Recetas](./public/screenshots/explorar.png)

### Dashboard
![Dashboard](./public/screenshots/dashboard.png)

### Crear Receta
![Crear Receta](./public/screenshots/crear-receta.png)

---

## 🛠️ Stack tecnológico

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Next.js** | 14.2.35 | Framework full-stack con App Router |
| **TypeScript** | 5.x | Tipado estático y mejor desarrollo |
| **Tailwind CSS** | 3.x | Estilos y diseño responsivo |
| **Supabase** | 2.x | Base de datos PostgreSQL y Autenticación |
| **Vercel** | - | Despliegue en producción |

---

## 👥 Roles de usuario

| Rol | Permisos |
|-----|----------|
| **👤 Lector** | ✅ Ver recetas públicas<br>✅ Buscar recetas por nombre<br>✅ Guardar recetas como favoritas<br>✅ Ver detalles de recetas |
| **👨‍🍳 Chef** | ✅ Todos los permisos del lector<br>✅ Crear nuevas recetas<br>✅ Editar sus propias recetas<br>✅ Eliminar sus propias recetas<br>✅ Gestionar sus recetas desde el dashboard |

---

## 🗄️ Modelo de datos

### Diagrama de relaciones
