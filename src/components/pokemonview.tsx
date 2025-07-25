import React, {useState, useEffect} from "react";
interface PokemonViewProps{
    id: number;
}
interface Pokemon {
    id: number;
    name: string;
    height: number;
    weight: number;
    types: string[];
}
const PokemonView: React.FC<PokemonViewProps> = ({ id }) => {
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const [loading, setLoading] = useState(true);

const getTypeIconUrl = (type: string): string => {
  switch (type.toLowerCase()) {
    case "normal":
      return "/assets/types/Normal.png";
    case "fire":
      return "/assets/types/Fire.png";
    case "water":
      return "/assets/types/Water.png";
    case "grass":
      return "/assets/types/Grass.png";
    case "electric":
      return "/assets/types/Electric.png";
    case "ice":
      return "/assets/types/Ice.png";
    case "fighting":
      return "/assets/types/Fighting.png";
    case "poison":
      return "/assets/types/Poison.png";
    case "ground":
      return "/assets/types/Ground.png";
    case "flying":
      return "/assets/types/Flying.png";
    case "psychic":
      return "/assets/types/Psychic.png";
    case "bug":
      return "/assets/types/Bug.png";
    case "rock":
      return "/assets/types/Rock.png";
    case "ghost":
      return "/assets/types/Ghost.png";
    case "dragon":
      return "/assets/types/Dragon.png";
    case "dark":
      return "/assets/types/Dark.png";
    case "steel":
      return "/assets/types/Steel.png";
    default:
      return "/assets/types/default.png";
  }
};

const TypeImages = (p: Pokemon) => {
  const images = [];

  for (const tipo of p.types) {
    const url = getTypeIconUrl(tipo);
    images.push(
      <img
        key={tipo}
        src={url}
        alt={tipo}
        title={tipo}
        className="w-6 h-6 inline-block"
      />
    );
  }

  return <>{images}</>;
};
    useEffect(() => {
        const fetchPokemonDetails = async () =>{
            setLoading(true);
            try {
                const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + id);
                if (!response.ok){
                    throw new Error("Error al cargar los datos del pokemon");
                }
                const data = await response.json();
                const PokemonData: Pokemon = {
                    id: data.id,
                    name: data.name,
                    height: data.height,
                    weight: data.weight,
                    types: data.types.map((type: { type: { name: string } }) => type.type.name),
                };
                setPokemon(PokemonData);
            }catch(error){
                console.error("Error fetching Pokemon details:", error);
            }
        }
        fetchPokemonDetails();
    }, [id]);

    if (loading) {
        return <div className="text-center">Cargando...</div>;
    }

    if (!pokemon) {
        return <div className="text-center">Pokemon no encontrado</div>;
    }

    return (
        <div className="p-4 bg-white shadow-md rounded-lg max-w-md w-full">
            <h1 className="text-xl font-bold mb-2">
                {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
            </h1>
            <p className="text-gray-700">
                <strong>ID:</strong> {pokemon.id}
            </p>
            <p className="text-gray-700">
                <strong>Altura:</strong> {pokemon.height / 10} m 
            </p>
            <p className="text-gray-700">
                <strong>Peso:</strong> {pokemon.weight / 10} kg
            </p>
           <div className="text-gray justify-center">
            Tipos: <TypeImages {...pokemon} />
           </div>
            <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                alt={pokemon.name}
                className="mt-4 w-32 h-32"
            />
            <p>ll</p>
        </div>
    );
};

export default PokemonView;