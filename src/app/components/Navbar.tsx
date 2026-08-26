// src/components/Navbar.tsx
import Link from 'next/link';

interface NavbarProps {
  isAuthenticated?: boolean;
  userRole?: string;
}

export default function Navbar({ isAuthenticated = false, userRole = '' }: NavbarProps) {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="font-bold text-xl text-blue-600">
            🍳 Recetario
          </Link>
          
          <div className="flex gap-4">
            <Link href="/explorar" className="text-gray-700 hover:text-blue-600">
              Explorar
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link href="/dashboard" className="text-gray-700 hover:text-blue-600">
                  Dashboard
                </Link>
                {userRole === 'chef' && (
                  <Link href="/mis-recetas" className="text-gray-700 hover:text-blue-600">
                    Mis Recetas
                  </Link>
                )}
                <button className="text-red-600 hover:text-red-800">
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-gray-700 hover:text-blue-600">
                  Iniciar Sesión
                </Link>
                <Link 
                  href="/registro" 
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Registrarse
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}