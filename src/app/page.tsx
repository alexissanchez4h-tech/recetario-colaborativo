// src/app/page.tsx
import { createClient } from "../lib/supabaseServer";

export default async function Home() {
  const supabase = createClient();
  
  const { data: recipes, error } = await supabase
    .from('recipes')
    .select(`
      *,
      profiles (
        full_name,
        role
      )
    `)
    .order('created_at', { ascending: false })
    .limit(6);

  if (error) {
    console.error('Error:', error);
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-purple-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🍳 Recetario Colaborativo
          </h1>
          <p className="text-gray-600">
            Descubre y comparte recetas con la comunidad
          </p>
          <div className="mt-6">
            <a href="/explorar" className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Ver todas las recetas →
            </a>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Recetas Destacadas 🍽️
        </h2>

        {!recipes || recipes.length === 0 ? (
          <p className="text-gray-500">No hay recetas disponibles.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <div 
                key={recipe.id} 
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-soft hover:shadow-xl transition-all duration-300 overflow-hidden border border-white/60 hover:scale-[1.02] hover:border-blue-200"
              >
                <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
                  {recipe.imagen_url ? (
                    <img 
                      src={recipe.imagen_url} 
                      alt={recipe.titulo}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-6xl">🍽️</span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {recipe.titulo}
                  </h3>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                      {recipe.tipo || 'Receta'}
                    </span>
                    <span className="text-sm text-gray-500">
                      👨‍🍳 {recipe.profiles?.full_name || 'Anónimo'}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {recipe.descripcion || 'Sin descripción'}
                  </p>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <span className="text-sm text-gray-500">
                      ✍️ {recipe.profiles?.full_name || 'Anónimo'}
                    </span>
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-semibold transition-colors">
                      Ver receta →
                    </button>
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