import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: string[];
  ability: string;
}

const PokemonView: React.FC = () => {
  const { stringId } = useParams<{ stringId: string }>();
  const id = Number(stringId);
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);

  const getTypeIconUrl = (type: string): string => {
    switch (type.toLowerCase()) {
      case "normal":
        return "/assets/NormalIC_Masters.png";
      case "fire":
        return "/assets/FireIC_Masters.png";
      case "water":
        return "/assets/WaterIC_Masters.png";
      case "grass":
        return "/assets/GrassIC_Masters.png";
      case "electric":
        return "/assets/ElectricIC_Masters.png";
      case "ice":
        return "/assets/IceIC_Masters.png";
      case "fighting":
        return "/assets/FightingIC_Masters.png";
      case "poison":
        return "/assets/PoisonIC_Masters.png";
      case "ground":
        return "/assets/GroundIC_Masters.png";
      case "flying":
        return "/assets/FlyingIC_Masters.png";
      case "psychic":
        return "/assets/PsychicIC_Masters.png";
      case "bug":
        return "/assets/BugIC_Masters.png";
      case "rock":
        return "/assets/RockIC_Masters.png";
      case "ghost":
        return "/assets/GhostIC_Masters.png";
      case "dragon":
        return "/assets/DragonIC_Masters.png";
      case "dark":
        return "/assets/DarkIC_Masters.png";
      case "steel":
        return "/assets/SteelIC_Masters.png";
      default:
        return "/assets/defaultIC_Masters.png";
    }
  };

  const TypeImages = (p: Pokemon) => {
    return (
      <>
        {p.types.map((tipo) => (
          <img
            key={tipo}
            src={getTypeIconUrl(tipo)}
            alt={tipo}
            title={tipo}
            className="w-20 h-20 inline-block"
          />
        ))}
      </>
    );
  };

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!response.ok) {
          throw new Error("Error al cargar los datos del pokemon");
        }
        const data = await response.json();
        const PokemonData: Pokemon = {
          id: data.id,
          name: data.name,
          height: data.height,
          weight: data.weight,
          types: data.types.map(
            (type: { type: { name: string } }) => type.type.name
          ),
          ability: data.abilities[0].ability.name,
        };
        setPokemon(PokemonData);
      } catch (error) {
        console.error("Error fetching Pokemon details:", error);
        setPokemon(null);
      } finally {
        setLoading(false);
      }
    };
    fetchPokemonDetails();
  }, [id]);

  if (loading) {
    return <div className="text-center">Cargando...</div>;
  }

  if (!pokemon) {
    return <div className="text-center">Pokemon no encontrado</div>;
  }

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-gray-100"
      style={{
        backgroundImage:
          "url('https://cdn.wallpapersafari.com/98/7/Iu9XxP.jpg')",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="p-6 bg-white shadow-lg rounded-2xl w-full max-w-3xl mx-4">
        <h1 className="text-4xl font-bold mb-4 capitalize text-center">
          {pokemon.name}
        </h1>
        <p className="text-gray-700 text-lg">
          <strong>N°: </strong> {pokemon.id}
        </p>
        <p className="text-gray-700 text-lg">
          <strong>Altura:</strong> {pokemon.height / 10} m
        </p>
        <p className="text-gray-700 text-lg">
          <strong>Peso:</strong> {pokemon.weight / 10} kg
        </p>
        <p className="text-gray-700 text-lg font-italic">
          Habilidad: {pokemon.ability}
        </p>
        <div className="text-gray-700 mb-4 flex items-center justify-center gap-2 mt-2">
          <span className="font-semibold">Tipos:</span>
          <TypeImages {...pokemon} />
        </div>
        <div className="flex justify-center">
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${pokemon.id}.gif`}
            alt={pokemon.name}
            className="mt-4 w-80 h-80"
          />
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/back/${pokemon.id}.gif`}
            alt={pokemon.name}
            className="mt-4 w-80 h-80"
          />
        </div>
      </div>
    </div>
  );
};

export default PokemonView;
