import { pokemonApi } from "../api/pokemonApi";
import { ErrorMessage } from "./ErrorMessage";
import { LoadingSpinner } from "./LoadingSpinner";
import { PokemonCard } from "./PokemonCard";
import { useState } from "react";

interface PokemonListProps {
  onSelectPokemon: (id: string) => void;
}

const { useGetPokemonListQuery } = pokemonApi;  

export const PokemonList: React.FC<PokemonListProps> = ({ onSelectPokemon }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const offset = (currentPage - 1) * itemsPerPage;

  const { 
    data, 
    error, 
    isLoading,
    refetch 
  } = useGetPokemonListQuery({ limit: itemsPerPage, offset });

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

  const totalPages = data ? Math.ceil(data.count / itemsPerPage) : 0;
  const hasNextPage = currentPage < totalPages;
  const hasPrevPage = currentPage > 1;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getPaginationNumbers = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

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
        <div className="mt-8 space-y-4">
          <div className="text-center text-gray-600">
            <p>
              Showing {offset + 1}-{Math.min(offset + itemsPerPage, data.count)} of {data.count} Pokemon
            </p>
            <p className="text-sm">
              Page {currentPage} of {totalPages}
            </p>
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center space-x-2">
            {/* Previous Button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={!hasPrevPage}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                hasPrevPage
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Previous
            </button>

            {/* Page Numbers */}
            <div className="flex space-x-1">
              {getPaginationNumbers().map((pageNum, index) => (
                <button
                  key={index}
                  onClick={() => typeof pageNum === 'number' ? handlePageChange(pageNum) : undefined}
                  disabled={pageNum === '...'}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    pageNum === currentPage
                      ? 'bg-blue-600 text-white'
                      : pageNum === '...'
                      ? 'bg-transparent text-gray-400 cursor-default'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {pageNum}
                </button>
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={!hasNextPage}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                hasNextPage
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Next
            </button>
          </div>

          {/* Quick Jump */}
          <div className="flex justify-center items-center space-x-2 text-sm">
            <span className="text-gray-600">Go to page:</span>
            <input
              type="number"
              min="1"
              max={totalPages}
              value={currentPage}
              onChange={(e) => {
                const page = parseInt(e.target.value);
                if (page >= 1 && page <= totalPages) {
                  handlePageChange(page);
                }
              }}
              className="w-16 px-2 py-1 border border-gray-300 rounded text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-gray-600">of {totalPages}</span>
          </div>
        </div>
      )}
    </div>
  );
};