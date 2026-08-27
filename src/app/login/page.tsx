export default function LoginPage() {
    return (
        <section className="min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-slate-800 rounded-2xl p-8 shadow-xl">
                {/* Título */}
                <h1 className="text-2xl font-bold text-white mb-2">
                    Iniciar sesión
                </h1>
                <p className="text-slate-400 mb-8">
                    Accede a tu cuenta de DevPort
                </p>
                {/* Campos del formulario — placeholder por ahora */}
                <div className="flex flex-col gap-4">
                    <input
                        type="email"
                        placeholder="correo@ejemplo.com"
                        className="bg-slate-700 text-white rounded-lg px-4 py-3 border border-slate-600 focus:outline-none focus:border-blue-500"
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        className="bg-slate-700 text-white rounded-lg px-4 py-3 border border-slate-600 focus:outline-none focus:border-blue-500"
                    />
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-colors">
                        Iniciar sesión
                    </button>
                </div>
            </div>
        </section>
    )
}