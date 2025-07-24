import React, { useContext, useState } from "react";
import { PokemonContext } from "../context/pokemonContext";

const Home: React.FC = () => {
  const { pokemonList, loading } = useContext(PokemonContext);
  const [query, setQuery] = useState("");

  const filtered = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(query.toLowerCase())
  );


  return (
    <div
    className="min-h-screen flex items-center justify-center bg-gray-100"
    style={{
      backgroundImage: "url('https://cdn.wallpapersafari.com/98/7/Iu9XxP.jpg')",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
    }}>
      <div className="p-4 bg-white shadow-md rounded-lg max-w-md w-full flex flex-col 
      items-center border border-gray-300">
        <h1 className="text-4xl font-bold mb-4">Pokedex</h1>
        <p className="text-lg text-gray-700">Busca tu pokemon favorito</p>

        <input
          type="text"
          placeholder="Buscar Pokemon..."
          className="mt-4 border border-gray-300 rounded-md px-4 py-2 w-full"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {loading ? (
          <p className="mt-4 text-gray-500">Cargando...</p>
        ) : (
          <ul className="mt-4 w-full max-h-60 overflow-y-auto border border-gray-300 rounded-md shadow-sm bg-white">
            {filtered.length > 0 ? (
              filtered.map((p) => (
                <li
                  key={p.id} 
                  className="p-2 flex items-center gap-3 hover:bg-gray-100 rounded-md cursor-pointer capitalize"
                >
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png`}
                    alt={p.name}
                    className="w-10 h-10"
                  />
                  {p.name}  
                </li>
              ))
            ) : (
              <li className="p-2 text-gray-500">No se encontraron resultados</li>
            )}
          </ul>
        )}
      </div>
    </div>
  ); 
};

export default Home;
