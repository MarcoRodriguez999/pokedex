import React, { createContext, useState, useEffect } from "react";

interface Pokemon {
  id: number;
  name: string;
  url: string;
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

export const PokeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const Pokelimit = 386;

  const fetchPoke = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${Pokelimit}&offset=0`
      );
      if (!res.ok) {
        throw new Error(`Error HTTP: ${res.status}`);
      }
      const data: PokemonAPIResponse = await res.json();

      const listWithId: Pokemon[] = data.results.map((p) => {
        const id = parseInt(p.url.split("/").filter(Boolean).pop() || "0", 10);
        return { ...p, id };
      });

      setPokemonList(listWithId);
      localStorage.setItem("Pokemons", JSON.stringify(listWithId));
    } catch (error) {
      console.error("Error fetching Pokemon list:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem("Pokemons");
    if (saved) {
      setPokemonList(JSON.parse(saved));
      setLoading(false);
    } else {
      fetchPoke();
    }
  }, []);

  useEffect(() => {
    fetchPoke();
  }, []);

  return (
    <PokemonContext.Provider
      value={{
        pokemonList: pokemonList,
        loading,
        reload: fetchPoke,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};
