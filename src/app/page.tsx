// src/app/page.tsx
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Faltan las variables de entorno NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY"
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

type RecipeCardProps = {
  id: number;
  Titulo: string;
  Autor: string;
  Colaborador: "Chef" | "Lector";
  Tipo: string;
  Descripcion: string;
  Tags: string[];
  imagen?: string;
};

function RecipeCard({
  id,
  Titulo,
  Autor,
  Colaborador,
  Tipo,
  Descripcion,
  Tags,
  imagen,
}: RecipeCardProps) {
  return (
    <article
      key={id}
      className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-md"
    >
      {imagen ? (
        <img src={imagen} alt={Titulo} className="h-52 w-full object-cover" />
      ) : (
        <div className="flex h-52 items-center justify-center bg-gradient-to-br from-amber-100 to-orange-200 text-4xl">
          🍽️
        </div>
      )}

      <div className="space-y-4 p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-800">
            {Tipo}
          </span>
          <span className="text-xs font-medium text-gray-500">{Colaborador}</span>
        </div>

        <div>
          <h3 className="text-xl font-bold text-gray-900">{Titulo}</h3>
          <p className="mt-1 text-sm text-gray-600">por {Autor}</p>
        </div>

        <p className="line-clamp-3 text-sm text-gray-700">{Descripcion}</p>

        <div className="flex flex-wrap gap-2">
          {Tags.map((tag, index) => (
            <span
              key={`${id}-${tag}-${index}`}
              className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

export default async function Home() {
  // Consulta con la relación correcta
  const { data: recipes, error } = await supabase
    .from('recipes')
    .select(`
      *,
      profiles!recipes_chef_id_fkey (
        full_name,
        role
      )
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error al cargar recetas:', error);
    return (
      <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-center py-10">
          🍳 Recetario Colaborativo
        </h1>
        <p className="text-red-500">Error al cargar las recetas: {error.message}</p>
      </main>
    );
  }

  // Transformar datos para PostCards
  const posts = recipes?.map((recipe: any) => ({
    id: recipe.id,
    Titulo: recipe.titulo,
    Autor: recipe.profiles?.full_name || 'Usuario desconocido',
    Colaborador: recipe.profiles?.role === 'chef' ? 'Chef' : 'Lector',
    Tipo: recipe.tipo || 'otro',
    Descripcion: recipe.descripcion || 'Sin descripción',
    Tags: recipe.tags || [],
    imagen: recipe.imagen_url || undefined,
  })) || [];

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-center py-10">
        🍳 Recetario Colaborativo
      </h1>
      <p className="text-center text-gray-600">
        Bienvenido a la plataforma de recetas colaborativas
      </p>

      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Recetas Destacadas 🍽️
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post: any) => (
            <RecipeCard
              key={post.id}
              id={post.id}
              Titulo={post.Titulo}
              Autor={post.Autor}
              Colaborador={post.Colaborador as "Chef" | "Lector"}
              Tipo={post.Tipo}
              Descripcion={post.Descripcion}
              Tags={post.Tags}
              imagen={post.imagen}
            />
          ))}
        </div>
        
        {posts.length === 0 && (
          <p className="text-center text-gray-500 mt-8">
            No hay recetas disponibles. ¡Sé el primero en publicar una!
          </p>
        )}
      </section>
    </main>
  );
}