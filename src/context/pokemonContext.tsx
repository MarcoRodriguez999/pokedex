import React, { createContext, useState, useEffect } from "react";

interface Pokemon {
  id: number;
  name: string;
  url: string;
}

interface PokemonDetails {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: { type: { name: string } }[];
  sprites: {
    front_default: string;
    back_default: string;
    other?: {
      "official-artwork"?: {
        front_default?: string;
      };
    };
  };
}

interface PokemonAPIResponse {
  results: { name: string; url: string }[];
}

interface PokemonContextProps {
  pokemonList: Pokemon[];
  loading: boolean;
  reload: () => void;
}

export const PokemonContext = createContext<PokemonContextProps>({
  pokemonList: [],
  loading: true,
  reload: () => {},
});

export const PokeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [pokemonData, setPokemonData] = useState<PokemonDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const Pokelimit = 386;

  const fetchPoke = async (limit: number = 100, offset: number = 0) => {
  setLoading(true);

  try {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data: PokemonAPIResponse = await res.json();

    const listWithId: Pokemon[] = data.results.map((p) => {
      const segments = p.url.split("/").filter(Boolean);
      const id = Number(segments[segments.length - 1]);
      return { ...p, id };
    });

    setPokemonList(listWithId);
  } catch (error) {
    console.error(" Error fetching Pokémon list:", error);
  } finally {
    setLoading(false);
  }
};


  const fetchPokemonDetails = async (list: Pokemon[]) => {
    setLoading(true);
    try {
      const details: PokemonDetails[] = [];
      for (const pokemon of list) {
        try {
          const res = await fetch(pokemon.url);
          if (!res.ok) {
            throw new Error(`Error HTTP: ${res.status}`);
          }
          const data: PokemonDetails = await res.json();
          details.push(data);
        } catch (error) {
          console.error(`Error fetching details for ${pokemon.name}:`, error);
        }
      }
      setPokemonData(details);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPoke(386,0);
  }, []);

  useEffect(() => {
    if (pokemonList.length > 0) {
      fetchPokemonDetails(pokemonList);
    }
  }, [pokemonList]);

  return (
    <PokemonContext.Provider
      value={{
        // ✅ Ahora devolvemos la lista con id incluido
        pokemonList: pokemonList, 
        loading,
        reload: fetchPoke,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};
