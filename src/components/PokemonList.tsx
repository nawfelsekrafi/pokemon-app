import { pokemonApi } from "../api/pokemonApi";
import { ErrorMessage } from "./ErrorMessage";
import { LoadingSpinner } from "./LoadingSpinner";
import { PokemonCard } from "./PokemonCard";

interface PokemonListProps {
  onSelectPokemon: (id: string) => void;
}

const { useGetPokemonListQuery } = pokemonApi;  

export const PokemonList: React.FC<PokemonListProps> = ({ onSelectPokemon }) => {
  const { 
    data, 
    error, 
    isLoading,
    refetch 
  } = useGetPokemonListQuery({ limit: 50 });

  if (isLoading) return <LoadingSpinner />;
  
  if (error) {
    return (
      <div className="space-y-4">
        <ErrorMessage message="Failed to load Pokemon list. Please try again." />
        <div className="text-center">
          <button 
            onClick={() => refetch()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          PokéDex
        </h1>
        <p className="text-center text-gray-600">
          Discover and learn about Pokemon! Click on any Pokemon to see detailed information.
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {data?.results.map((pokemon: PokemonListItem) => (
          <PokemonCard
            key={pokemon.name}
            pokemon={pokemon}
            onClick={onSelectPokemon}
          />
        ))}
      </div>
      
      {data && (
        <div className="mt-6 text-center text-gray-600">
          <p>Showing {data.results.length} of {data.count} Pokemon</p>
        </div>
      )}
    </div>
  );
};