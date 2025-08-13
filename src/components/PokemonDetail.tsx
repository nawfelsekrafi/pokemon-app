import { ArrowLeft, Star } from "lucide-react";
import { ErrorMessage } from "./ErrorMessage";
import { LoadingSpinner } from "./LoadingSpinner";
import { StatBar } from "./StatBar";
import { useGetPokemonDetailQuery } from "../api/pokemonApi";
import { getTypeColor, capitalizeFirstLetter } from "../utils/helpers";

interface PokemonDetailProps {
  pokemonId: string;
  onBack: () => void;
}

export const PokemonDetail: React.FC<PokemonDetailProps> = ({ pokemonId, onBack }) => {
  const { 
    data: pokemon, 
    error, 
    isLoading,
    refetch 
  } = useGetPokemonDetailQuery(pokemonId);

  if (isLoading) return <LoadingSpinner />;
  
  if (error) {
    return (
      <div className="container mx-auto px-4 py-6">
        <button 
          onClick={onBack}
          className="flex items-center text-blue-500 hover:text-blue-600 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to List
        </button>
        <ErrorMessage message="Failed to load Pokemon details. Please try again." />
        <div className="text-center mt-4">
          <button 
            onClick={() => refetch()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors mr-2"
          >
            Retry
          </button>
          <button 
            onClick={onBack}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!pokemon) return null;

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <button 
        onClick={onBack}
        className="flex items-center text-blue-500 hover:text-blue-600 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to List
      </button>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold capitalize">
              {pokemon.name}
            </h1>
            <span className="text-xl bg-white text-black px-3 py-1 rounded-full">
              #{pokemon.id.toString().padStart(3, '0')}
            </span>
          </div>
        </div>

        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left Column - Image and Basic Info */}
            <div className="space-y-6">
              <div className="text-center">
                <img 
                  src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}
                  alt={pokemon.name}
                  className="w-48 h-48 mx-auto"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-gray-800">{pokemon.height / 10}m</p>
                  <p className="text-sm text-gray-600">Height</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-gray-800">{pokemon.weight / 10}kg</p>
                  <p className="text-sm text-gray-600">Weight</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-800">Types</h3>
                <div className="flex gap-2">
                  {pokemon.types.map((type: PokemonType) => (
                    <span 
                      key={type.type.name}
                      className={`px-3 py-1 rounded-full text-white text-sm font-medium ${getTypeColor(type.type.name)}`}
                    >
                      {capitalizeFirstLetter(type.type.name)}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Stats */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
                <Star className="w-5 h-5 mr-2 text-yellow-500" />
                Base Stats
              </h3>
              <div className="space-y-2">
                {pokemon.stats.map((stat : any) => (
                  <StatBar
                    key={stat.stat.name}
                    label={stat.stat.name}
                    value={stat.base_stat}
                  />
                ))}
              </div>
              
              {pokemon.base_experience && (
                <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <p className="text-sm text-gray-700">
                    <strong>Base Experience:</strong> {pokemon.base_experience}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};