"use client"; // Esto indica que este componente se renderiza en el cliente

// 1. Definimos las props que recibirá el componente 
interface SearchBarProps {
    query: string; // El valor actual de la búsqueda
    onQueryChange: (newQuery: string) => void; // Función que se llama cuando el valor de la búsqueda cambia
}

// 2. El componente — recibe las props tipadas

export default function SearchBar({ query, onQueryChange }: SearchBarProps) { // Recibimos las props query y onQueryChange
    return (
        <div className="relative mb-8">

            <span className="absolute left-4 top-3.5 text-slate-400 text-lg">
                Buscar
            </span>

            <input
                type="text"
                value={query} // El valor del input es el query recibido por props
                onChange={(e) => onQueryChange(e.target.value)} // Cuando el valor cambia, llamamos a onQueryChange con el nuevo valor
                placeholder="Buscar por título, tag o autor..."
                className="w-full bg-slate-800 text-white rounded-xl pl-24 pr-4 py-3 border border-slate-700 focus:outline-none focus:border-blue-500 transition-colors"
            />
        </div>
    )

}