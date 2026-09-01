// src/app/dashboard/page.tsx
import { supabase } from "../../lib/supabaseClient";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
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

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          👤 Mi Dashboard
        </h1>

        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
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
            <p className="text-gray-600 border-t pt-4 mt-4">
              {profile.bio}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              📚 Recetas
            </h3>
            <p className="text-gray-600">Gestiona tus recetas publicadas</p>
            <a
              href="/mis-recetas"
              className="inline-block mt-4 text-blue-600 hover:text-blue-800 font-medium"
            >
              Ver mis recetas →
            </a>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              ⭐ Favoritos
            </h3>
            <p className="text-gray-600">Tus recetas favoritas</p>
            <a
              href="/favoritos"
              className="inline-block mt-4 text-blue-600 hover:text-blue-800 font-medium"
            >
              Ver favoritos →
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}