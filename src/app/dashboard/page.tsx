// src/app/dashboard/page.tsx
import { createClient } from "../../lib/supabaseServer";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function DashboardPage() {
  const supabase = createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  const user = session.user;

  // Obtener el perfil del usuario
  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, role, bio")
    .eq("id", user.id)
    .single();

  // Obtener cantidad de recetas del usuario (si es chef)
  let recipesCount = 0;
  if (profile?.role === 'chef') {
    const { count } = await supabase
      .from("recipes")
      .select("*", { count: 'exact', head: true })
      .eq("chef_id", user.id);
    recipesCount = count || 0;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-purple-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          👤 Mi Dashboard
        </h1>

        {/* Perfil del usuario */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-soft border border-white/60 p-6 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {profile?.full_name?.charAt(0) || 'U'}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {profile?.full_name || 'Usuario'}
              </h2>
              <p className="text-gray-500">{user.email}</p>
              <span className="inline-block mt-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                {profile?.role === 'chef' ? '👨‍🍳 Chef' : '📖 Lector'}
              </span>
            </div>
          </div>
          {profile?.bio && (
            <p className="text-gray-600 border-t border-gray-100 pt-4 mt-4">
              {profile.bio}
            </p>
          )}
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-soft border border-white/60 p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              📚 Mis Recetas
            </h3>
            <p className="text-3xl font-bold text-blue-600">{recipesCount}</p>
            <p className="text-gray-500 text-sm">recetas publicadas</p>
            <Link
              href="/mis-recetas"
              className="inline-block mt-4 text-blue-600 hover:text-blue-800 font-medium"
            >
              Ver mis recetas →
            </Link>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-soft border border-white/60 p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              ⭐ Acciones rápidas
            </h3>
            <div className="space-y-2 mt-2">
              {profile?.role === 'chef' && (
                <Link
                  href="/crear-receta"
                  className="block w-full text-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  + Crear nueva receta
                </Link>
              )}
              <Link
                href="/explorar"
                className="block w-full text-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                🔍 Explorar recetas
              </Link>
            </div>
          </div>
        </div>

        {/* Información adicional */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-soft border border-white/60 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-2">
            ℹ️ Información de la cuenta
          </h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>ID:</strong> {user.id.substring(0, 20)}...</p>
            <p><strong>Rol:</strong> {profile?.role === 'chef' ? 'Chef' : 'Lector'}</p>
            <p><strong>Miembro desde:</strong> {new Date(user.created_at || '').toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </main>
  );
}