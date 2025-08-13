import { useState } from "react";
import { PokemonList } from "./PokemonList";
import { PokemonDetail } from "./PokemonDetail";

export const PokemonApp: React.FC = () => {
  const [selectedPokemonId, setSelectedPokemonId] = useState<string | null>(null);

  const handleSelectPokemon = (id: string) => {
    setSelectedPokemonId(id);
  };

  const handleBackToList = () => {
    setSelectedPokemonId(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {selectedPokemonId ? (
        <PokemonDetail
          pokemonId={selectedPokemonId}
          onBack={handleBackToList}
        />
      ) : (
        <PokemonList onSelectPokemon={handleSelectPokemon} />
      )}
    </div>
  );
};
