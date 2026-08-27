// src/app/page.tsx
"use client";
import { useState } from "react";
import PostCards from "./components/PostCards";
import SearchBar from "./components/SearchBar";


export default function Home() {
  const [query, setQuery] = useState("");
  const posts = [
    {
      id: 1,
      Titulo: "Ensalada César",
      Autor: "Ailin Castro",
      Colaborador: "Chef" as const,
      Tipo: "entrada" as const,
      Descripcion: "Una deliciosa ensalada con pollo y aderezo César.",
      Tags: ["ensalada", "pollo", "César"],
      imagen: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?w=600", // URL real
    },
    {
      id: 2,
      Titulo: "Lasaña de Carne",
      Autor: "Alexis Sanchez",
      Colaborador: "Chef" as const,
      Tipo: "plato principal" as const,
      Descripcion: "Lasaña clásica con carne molida y queso.",
      Tags: ["lasaña", "carne", "queso"],
      imagen: "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?w=600",
    },
    {
      id: 3,
      Titulo: "Tarta de Manzana",
      Autor: "Mateo Castellanos",
      Colaborador: "Lector" as const,
      Tipo: "postre" as const,
      Descripcion: "Tarta casera con manzanas frescas y canela.",
      Tags: ["tarta", "manzana", "postre"],
      imagen: "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?w=600",
    },
  ];

  const filteredPosts = posts.filter((post) => {
    const lowerCaseQuery = query.toLowerCase();
    return (
      post.Titulo.toLowerCase().includes(lowerCaseQuery) ||
      post.Tags.some((tag) => tag.toLowerCase().includes(lowerCaseQuery)) ||
      post.Autor.toLowerCase().includes(lowerCaseQuery)
    );
  });

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-center py-10">
        🍳 Recetario Colaborativo
      </h1>
      <p className="text-center text-gray-600">
        Bienvenido a la plataforma de recetas colaborativas
      </p>
      <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded mt-6">
        Explorar Proyectos
      </button>

      <SearchBar query={query} onQueryChange={setQuery} />
      <p className="text-gray-600 mb-6">
        {filteredPosts.length} receta(s) encontrada(s)
      </p>
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Recetas Destacadas 🍽️
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <PostCards
              key={post.id}
              id={post.id}
              Titulo={post.Titulo}
              Autor={post.Autor}
              Colaborador={post.Colaborador}
              Tipo={post.Tipo}
              Descripcion={post.Descripcion}
              Tags={post.Tags}
              imagen={post.imagen}
            />
          ))}
        </div>
        {filteredPosts.length === 0 && (
          <p className="text-center text-gray-500 mt-8">
            No se encontraron recetas que coincidan con tu búsqueda.
          </p>
        )}
      </section>
    </main>
  );
}