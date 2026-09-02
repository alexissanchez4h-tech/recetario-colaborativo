# 🍳 Recetario Colaborativo

Plataforma web que permite a los usuarios compartir y descubrir recetas de cocina de forma colaborativa. Los chefs pueden publicar sus recetas, mientras que los lectores pueden explorarlas y guardarlas como favoritas.


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


### Descripción de tablas

| Tabla | Descripción | Relaciones |
|-------|-------------|------------|
| **`profiles`** | Extiende la tabla `auth.users` de Supabase con datos adicionales (nombre, rol, biografía) | Uno a muchos con `recipes` y `favorites` |
| **`recipes`** | Almacena las recetas publicadas por los chefs | Pertenece a `profiles` (chef_id) |
| **`favorites`** | Guarda las recetas favoritas de los lectores | Muchos a muchos entre `profiles` y `recipes` |

---

## 🚀 Instalación local

### Requisitos previos
- Node.js 18.x o superior
- npm o yarn
- Cuenta en Supabase (gratuita)

### Pasos para ejecutar localmente

```bash
# 1. Clonar el repositorio
git clone https://github.com/alexissanchez4h-tech/recetario-colaborativo.git

# 2. Navegar al directorio
cd recetario-colaborativo

# 3. Instalar dependencias
npm install

# 4. Crear archivo de variables de entorno
cp .env.example .env.local

# 5. Completar las variables de entorno (ver sección siguiente)

# 6. Ejecutar en modo desarrollo
npm run dev

# 7. Abrir en el navegador
# http://localhost:3000

Credenciales de prueba

Para probar la aplicación sin registrarte, usa estas cuentas de prueba:
Rol	Email	Contraseña
👤 Lector	alexis.sanchez@ister.edu.ec	Contraseña=1234567
👨‍🍳 Chef	alexis.sanchez@ister.edu.ec	Contraseña=1234567

Nota: Estas credenciales deben ser creadas en Supabase. Puedes registrarte con tu propio correo durante la prueba.
✅ Funcionalidades implementadas
✔️ Autenticación real

    ☑

    Registro de nuevos usuarios
    ☑

    Inicio de sesión
    ☑

    Cierre de sesión
    ☑

    Protección de rutas con middleware
    ☑

    Roles guardados en la base de datos

✔️ CRUD completo

    ☑

    Crear - Formulario con Server Action
    ☑

    Leer - Listado y detalle de recetas
    ☑

    Actualizar - Edición por el chef dueño
    ☑

    Eliminar - Eliminación por el chef dueño

✔️ Interactividad en cliente

    ☑

    Barra de búsqueda con useState
    ☑

    Filtrado en tiempo real
    ☑

    Separación de Server/Client Components

✔️ Base de datos

    ☑

    3 tablas relacionadas con llaves foráneas
    ☑

    Extensión de auth.users con profiles
    ☑

    RLS (Row Level Security) configurado

✔️ Despliegue

    ☑

    URL pública en Vercel
    ☑

    Variables de entorno configuradas

✔️ Documentación

    ☑

    README.md completo
    ☑

    Video de defensa (mínimo 15 minutos)

👨‍💻 Autor

Alexis Sanchez

    GitHub: @alexissanchez4h-tech

    LinkedIn: Alexis Sanchez

Proyecto realizado para la asignatura Aplicaciones Web - Segundo Parcial.
📄 Licencia

Este proyecto es de código abierto y está disponible para fines educativos.
🙏 Agradecimientos

    Next.js por el framework

    Supabase por la base de datos y autenticación

    Tailwind CSS por los estilos

    Vercel por el hosting

📞 Soporte

Si tienes problemas al ejecutar el proyecto, verifica:

    Que las variables de entorno estén configuradas correctamente

    Que las tablas en Supabase estén creadas

    Que las credenciales de prueba funcionen