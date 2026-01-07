import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: string[];
  ability: string;
  description: string;
}

const PokemonView: React.FC = () => {
  const { stringId } = useParams<{ stringId: string }>();
  const id = Number(stringId);
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);
  const [viewButton, setViewButton] = useState("Frontal");

  const navigate = useNavigate();

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

  const ReverseButton = () => {
    setViewButton((prev) => (prev === "Frontal" ? "Posterior" : "Frontal"));
  };

  const TypeImages = (p: Pokemon) => (
    <>
      {p.types.map((tipo) => (
        <img
          key={tipo}
          src={getTypeIconUrl(tipo)}
          alt={tipo}
          title={tipo}
          className="m-1 w-8 h-8 inline-block"
        />
      ))}
    </>
  );

  const imageUrl =
    viewButton === "Frontal"
      ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${id}.gif`
      : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/back/${id}.gif`;

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!response.ok)
          throw new Error("Error al cargar los datos del Pokémon");
        const data = await response.json();

        const speciesResponse = await fetch(
          `https://pokeapi.co/api/v2/pokemon-species/${id}`
        );
        if (!speciesResponse.ok) throw new Error("Error al cargar la especie");
        const speciesData = await speciesResponse.json();

        const spanishName =
          speciesData.names.find(
            (n: { language: { name: string }; name: string }) =>
              n.language.name === "es"
          )?.name ?? data.name;

        const spanishDescription =
          speciesData.flavor_text_entries
            .find(
              (entry: { language: { name: string }; flavor_text: string }) =>
                entry.language.name === "es"
            )
            ?.flavor_text.replace(/[\n\f]/g, " ") ??
          "Sin descripción disponible.";

        const abilityUrl = data.abilities[0].ability.url;
        const abilityRes = await fetch(abilityUrl);
        const abilityData = await abilityRes.json();
        const spanishAbility =
          abilityData.names.find(
            (entry: { language: { name: string }; name: string }) =>
              entry.language.name === "es"
          )?.name ?? data.abilities[0].ability.name;

        const PokemonData: Pokemon = {
          id: data.id,
          name: spanishName,
          height: data.height,
          weight: data.weight,
          types: data.types.map((t: { type: { name: string } }) => t.type.name),
          ability: spanishAbility,
          description: spanishDescription,
        };

        setPokemon(PokemonData);
      } catch (error) {
        console.error("Error:", error);
        setPokemon(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonDetails();
  }, [id]);

  if (loading) return <div className="text-center">Cargando</div>;
  if (!pokemon) return <div className="text-center">Pokémon no encontrado</div>;

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-100 bg-center px-4"
      style={{
        backgroundImage:
          "url('https://cdn.wallpapersafari.com/98/7/Iu9XxP.jpg')",
      }}
    >
      <div className="w-[90%] sm:w-[80%] md:w-[70%] mx-auto my-6 bg-orange-100 border-4 border-orange-300 rounded-lg font-mono shadow-lg">
        <div className="bg-yellow-200 px-4 py-2 flex justify-between items-center border-b-4 border-yellow-400">
          <h2 className="text-gray-800 font-bold text-sm">
            INFORMACIÓN POKÉMON
          </h2>
          <button
            className="border-2 bg-coral px-3 py-1 rounded hover:bg-yellow-100"
            onClick={() => {
              navigate("/");
            }}
          >
            Volver
          </button>
        </div>

        <div className="flex flex-col md:flex-row p-4 gap-4">
          {/* Imagen y botón */}
          <div className="bg-white border-2 border-gray-300 rounded-md flex items-center justify-center mx-auto md:mx-0 w-full md:w-48 h-auto">
            <div className="w-full p-4 rounded shadow">
              <img
                src={imageUrl}
                alt={pokemon.name}
                className="object-contain w-full max-w-[160px] h-auto mx-auto"
              />
              <button
                onClick={ReverseButton}
                className="mt-2 w-full px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
              >
                {viewButton === "Frontal" ? "Ver Posterior" : "Ver Frontal"}
              </button>
            </div>
          </div>

          {/* Datos del Pokémon */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-2 text-sm">
            <span className="font-bold">Nº:</span>
            <span className="bg-gray-200 rounded px-2 py-0.5">
              {pokemon.id.toString().padStart(3, "0")}
            </span>
            <span className="font-bold">NOMBRE:</span>
            <span className="bg-gray-200 rounded px-2 py-0.5 uppercase">
              {pokemon.name.toUpperCase()}
            </span>
            <span className="font-bold">ALTURA:</span>
            <span>{pokemon.height / 10} M</span>
            <span className="font-bold">PESO:</span>
            <span>{pokemon.weight / 10} KG</span>
            <span className="font-bold">TIPO/s:</span>
            <span className="flex flex-wrap">{TypeImages(pokemon)}</span>
            <span className="font-bold">HABILIDAD:</span>
            <span className="bg-gray-200 rounded px-2 py-0.5">
              {pokemon.ability}
            </span>
          </div>
        </div>

        {/* Descripción */}
        <div className="bg-white border-t-4 border-orange-300 p-3 text-sm leading-snug">
          <span className="font-bold">Descripción: </span>
          <span>{pokemon.description}</span>
        </div>
      </div>
    </div>
  );
};

export default PokemonView;
