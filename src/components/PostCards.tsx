// src/components/PostCards.tsx
"use client";

interface PostCardsProps {
  id: number | string;
  Titulo: string;
  Autor: string;
  Colaborador: "Chef" | "Lector";
  Tipo: string;
  Descripcion: string;
  Tags: string[];
  imagen?: string;
}

export default function PostCards({
  Titulo,
  Autor,
  Colaborador,
  Tipo,
  Descripcion,
  Tags,
  imagen,
}: PostCardsProps) {
  const tipoColors: Record<string, string> = {
    entrada: "bg-green-100 text-green-800",
    "plato principal": "bg-blue-100 text-blue-800",
    postre: "bg-yellow-100 text-yellow-800",
    bebida: "bg-purple-100 text-purple-800",
    otro: "bg-gray-100 text-gray-800",
  };

  const colaboradorIcon = Colaborador === "Chef" ? "👨‍🍳" : "👤";
  const colorClass = tipoColors[Tipo] || tipoColors.otro;

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.style.display = 'none';
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-soft hover:shadow-xl transition-all duration-300 overflow-hidden border border-white/60 hover:scale-[1.02] hover:border-blue-200">
      {/* Imagen */}
      <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
        {imagen ? (
          <img
            src={imagen}
            alt={Titulo}
            className="w-full h-full object-cover"
            onError={handleImageError}
          />
        ) : (
          <span className="text-6xl">🍽️</span>
        )}
      </div>
      
      {/* Contenido */}
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
          {Titulo}
        </h3>
        <div className="flex items-center justify-between mb-3">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${colorClass}`}>
            {Tipo}
          </span>
          <span className="text-sm text-gray-500">
            {colaboradorIcon} {Colaborador}
          </span>
        </div>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {Descripcion}
        </p>
        <div className="flex flex-wrap gap-2 mb-3">
          {Tags.map((tag) => (
            <span
              key={tag}
              className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs"
            >
              #{tag}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <span className="text-sm text-gray-500">✍️ {Autor}</span>
          <button className="text-blue-600 hover:text-blue-800 text-sm font-semibold transition-colors">
            Ver receta →
          </button>
        </div>
      </div>
    </div>
  );
}