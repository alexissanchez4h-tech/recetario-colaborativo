// src/app/page.tsx
export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-center py-10">
        🍳 Recetario Colaborativo
      </h1>
      <p className="text-center text-gray-600">
        Bienvenido a la plataforma de recetas colaborativas
      </p>
      <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded mt-6">
        Explorar Proyectos
      </button>
    </main>
  );
}