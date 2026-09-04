// src/app/editar-receta/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../../lib/supabaseClient";
import { updateRecipe } from "../../../lib/actions";

interface EditarRecetaPageProps {
  params: {
    id: string;
  };
}

export default function EditarRecetaPage({ params }: EditarRecetaPageProps) {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [recipe, setRecipe] = useState<any>(null);

  useEffect(() => {
    const loadRecipe = async () => {
      // Verificar sesión
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/login");
        return;
      }

      // Obtener la receta
      const { data, error } = await supabase
        .from("recipes")
        .select("*")
        .eq("id", params.id)
        .single();

      if (error) {
        setError("Receta no encontrada");
        setLoading(false);
        return;
      }

      // Verificar que el usuario es el dueño
      const { data: profile } = await supabase
        .from("profiles")
        .select("id")
        .eq("id", session.user.id)
        .single();

      if (data.chef_id !== profile?.id) {
        setError("No tienes permiso para editar esta receta");
        setLoading(false);
        return;
      }

      setRecipe(data);
      setLoading(false);
    };

    loadRecipe();
  }, [params.id, router]);

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-purple-50/50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <p className="text-gray-600">Cargando receta...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-purple-50/50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-soft border border-white/60 p-8">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={() => router.push("/mis-recetas")}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Volver a mis recetas
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-purple-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-soft border border-white/60 p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          ✏️ Editar Receta
        </h1>

        <form action={updateRecipe} className="space-y-6">
          <input type="hidden" name="id" value={recipe.id} />

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Título de la receta *
            </label>
            <input
              type="text"
              name="titulo"
              required
              defaultValue={recipe.titulo}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white/70"
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
              defaultValue={recipe.descripcion || ""}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white/70"
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
              defaultValue={recipe.ingredientes?.join(", ") || ""}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white/70"
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
              defaultValue={recipe.instrucciones}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white/70"
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
                defaultValue={recipe.tipo || "otro"}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white/70"
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
                defaultValue={recipe.tiempo_prep || ""}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white/70"
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
                defaultValue={recipe.porciones || ""}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white/70"
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
                defaultValue={recipe.imagen_url || ""}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white/70"
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
              defaultValue={recipe.tags?.join(", ") || ""}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white/70"
              placeholder="española, arroz, mariscos"
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium transition-colors"
            >
              💾 Guardar Cambios
            </button>
            <button
              type="button"
              onClick={() => router.push("/mis-recetas")}
              className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 font-medium transition-colors"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}