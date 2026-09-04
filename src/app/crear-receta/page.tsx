// src/app/crear-receta/page.tsx
"use client";

import { createRecipe } from "../../lib/actions";
import { useRouter } from "next/navigation";

export default function CrearRecetaPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          📝 Crear Nueva Receta
        </h1>

        <form action={createRecipe} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Título de la receta *
            </label>
            <input
              type="text"
              name="titulo"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ej: Paella Valenciana"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Descripción
            </label>
            <textarea
              name="descripcion"
              rows={3}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Breve descripción de tu receta..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Ingredientes (separados por coma) *
            </label>
            <input
              type="text"
              name="ingredientes"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Arroz, Pollo, Verduras, Azafrán"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Instrucciones *
            </label>
            <textarea
              name="instrucciones"
              rows={5}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="1. Calienta el aceite... 2. Añade el pollo..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Tipo
              </label>
              <select
                name="tipo"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="entrada">Entrada</option>
                <option value="plato principal">Plato Principal</option>
                <option value="postre">Postre</option>
                <option value="bebida">Bebida</option>
                <option value="otro">Otro</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Tiempo de prep. (min)
              </label>
              <input
                type="number"
                name="tiempo_prep"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="30"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Porciones
              </label>
              <input
                type="number"
                name="porciones"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="4"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                URL de imagen
              </label>
              <input
                type="url"
                name="imagen_url"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://ejemplo.com/imagen.jpg"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tags (separados por coma)
            </label>
            <input
              type="text"
              name="tags"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="española, arroz, mariscos"
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium"
            >
              Publicar Receta
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 font-medium"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}