// src/app/explorar/page.tsx
import { supabase } from "../../lib/supabaseClient";
import SearchBar from "../../components/SearchBar";

interface ExplorarPageProps {
  searchParams?: {
    q?: string;
  };
}

export default async function ExplorarPage({ searchParams }: ExplorarPageProps) {
  const query = searchParams?.q || "";

  // Construir la consulta
  let supabaseQuery = supabase
    .from('recipes')
    .select(`
      *,
      profiles (
        full_name,
        role
      )
    `);

  // Si hay búsqueda, filtrar por título
  if (query) {
    supabaseQuery = supabaseQuery.ilike('titulo', `%${query}%`);
  }

  const { data: recipes, error } = await supabaseQuery
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error:', error);
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-purple-50/50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">🍽️ Explorar Recetas</h1>
          <p className="text-red-500">Error: {error.message}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-purple-50/50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">🍽️ Explorar Recetas</h1>
        
        {/* Barra de búsqueda */}
        <SearchBar initialQuery={query} />

        {/* Resultados */}
        {!recipes || recipes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {query ? `No se encontraron recetas con "${query}"` : "No hay recetas disponibles."}
            </p>
            {query && (
              <p className="text-gray-400 mt-2">
                Prueba con otra palabra o <a href="/explorar" className="text-blue-600 hover:underline">ver todas las recetas</a>
              </p>
            )}
          </div>
        ) : (
          <>
            <p className="text-gray-500 text-sm mb-4">
              {recipes.length} receta{recipes.length !== 1 ? 's' : ''} encontrada{recipes.length !== 1 ? 's' : ''}
              {query && ` para "${query}"`}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recipes.map((recipe: any) => (
                <div 
                  key={recipe.id} 
                  className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-soft hover:shadow-xl transition-all duration-300 overflow-hidden border border-white/60 hover:scale-[1.02] hover:border-blue-200"
                >
                  {/* Imagen */}
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
                  
                  {/* Contenido */}
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
                    
                    {recipe.tags && recipe.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {recipe.tags.slice(0, 3).map((tag: string) => (
                          <span key={tag} className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                    
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
          </>
        )}
      </div>
    </main>
  );
}