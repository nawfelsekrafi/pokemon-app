import { extractIdFromUrl } from "../utils/helpers";

interface PokemonCardProps {
  pokemon: PokemonListItem;
  onClick: (id: string) => void;
}



export const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, onClick }) => {
  const pokemonId = extractIdFromUrl(pokemon.url);
  
  return (
    <div 
      className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow duration-200 border border-gray-200"
      onClick={() => onClick(pokemonId)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick(pokemonId);
        }
      }}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 capitalize">
          {pokemon.name}
        </h3>
        <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
          #{pokemonId.padStart(3, '0')}
        </span>
      </div>
      <div className="mt-2">
        <img 
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
          alt={pokemon.name}
          className="w-16 h-16 mx-auto"
          loading="lazy"
        />
      </div>
    </div>
  );
};