// src/app/mis-recetas/page.tsx
import { supabase } from "../lib/supabaseClient"; // Asegúrate de que esta ruta sea correcta
import Link from "next/link";
import { deleteRecipe } from "../lib/actions";
import { cookies } from "next/headers"; // <--- 1. Importamos cookies

export default async function MisRecetasPage() {
  // <--- 2. Forzamos a que Next.js espere a que las cookies estén listas
  const cookieStore = cookies();
  
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Debes iniciar sesión para ver tus recetas.</p>
      </main>
    );
  }

  // Obtener el perfil del usuario
  const { data: profile } = await supabase
    .from("profiles")
    .select("id, role")
    .eq("id", user.id)
    .single();

  if (!profile || profile.role !== "chef") {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Solo los chefs pueden ver esta página.</p>
      </main>
    );
  }

  // Obtener las recetas del chef
  const { data: recipes } = await supabase
    .from("recipes")
    .select("*")
    .eq("chef_id", profile.id)
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            📚 Mis Recetas
          </h1>
          <Link
            href="/crear-receta"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            + Nueva Receta
          </Link>
        </div>

        {recipes?.length === 0 ? (
          <p className="text-gray-500 text-center py-12">
            No has creado ninguna receta aún. 
            <Link href="/crear-receta" className="text-blue-600 hover:underline ml-2">
              ¡Crea tu primera receta!
            </Link>
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes?.map((recipe) => (
              <div key={recipe.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="h-48 bg-gray-200 relative">
                  {recipe.imagen_url ? (
                    <img
                      src={recipe.imagen_url}
                      alt={recipe.titulo}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500">
                      <span className="text-6xl">🍽️</span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {recipe.titulo}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {recipe.descripcion || "Sin descripción"}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {recipe.tags?.map((tag: string) => (
                      <span key={tag} className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Link
                      href={`/editar-receta/${recipe.id}`}
                      className="flex-1 text-center bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 text-sm font-medium"
                    >
                      ✏️ Editar
                    </Link>
                    <form action={deleteRecipe} className="flex-1">
                      <input type="hidden" name="id" value={recipe.id} />
                      <button
                        type="submit"
                        onClick={(e) => {
                          if (!confirm("¿Estás seguro de eliminar esta receta?")) {
                            e.preventDefault();
                          }
                        }}
                        className="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 text-sm font-medium"
                      >
                        🗑️ Eliminar
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}