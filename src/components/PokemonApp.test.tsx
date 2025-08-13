import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '../test/test-utils'
import { PokemonApp } from '../components/PokemonApp'

// Mock the child components
vi.mock('../components/PokemonList', () => ({
  PokemonList: ({ onSelectPokemon }: { onSelectPokemon: (id: string) => void }) => (
    <div data-testid="pokemon-list">
      <button onClick={() => onSelectPokemon('1')}>Select Pokemon 1</button>
    </div>
  )
}))

vi.mock('../components/PokemonDetail', () => ({
  PokemonDetail: ({ pokemonId, onBack }: { pokemonId: string; onBack: () => void }) => (
    <div data-testid="pokemon-detail">
      <span>Pokemon ID: {pokemonId}</span>
      <button onClick={onBack}>Back to List</button>
    </div>
  )
}))

describe('PokemonApp', () => {
  it('should render PokemonList by default', () => {
    render(<PokemonApp />)
    
    const pokemonList = screen.getByTestId('pokemon-list')
    expect(pokemonList).toBeInTheDocument()
    
    const pokemonDetail = screen.queryByTestId('pokemon-detail')
    expect(pokemonDetail).not.toBeInTheDocument()
  })

  it('should switch to PokemonDetail when a pokemon is selected', () => {
    render(<PokemonApp />)
    
    const selectButton = screen.getByText('Select Pokemon 1')
    fireEvent.click(selectButton)
    
    const pokemonDetail = screen.getByTestId('pokemon-detail')
    expect(pokemonDetail).toBeInTheDocument()
    expect(screen.getByText('Pokemon ID: 1')).toBeInTheDocument()
    
    const pokemonList = screen.queryByTestId('pokemon-list')
    expect(pokemonList).not.toBeInTheDocument()
  })

  it('should switch back to PokemonList when back button is clicked', () => {
    render(<PokemonApp />)
    
    // Select a pokemon
    const selectButton = screen.getByText('Select Pokemon 1')
    fireEvent.click(selectButton)
    
    // Verify detail view is shown
    expect(screen.getByTestId('pokemon-detail')).toBeInTheDocument()
    
    // Click back button
    const backButton = screen.getByText('Back to List')
    fireEvent.click(backButton)
    
    // Verify list view is shown again
    expect(screen.getByTestId('pokemon-list')).toBeInTheDocument()
    expect(screen.queryByTestId('pokemon-detail')).not.toBeInTheDocument()
  })

  it('should have correct container styling', () => {
    const { container } = render(<PokemonApp />)
    
    const mainContainer = container.firstChild as HTMLElement
    expect(mainContainer).toHaveClass('min-h-screen', 'bg-gray-100')
  })

  it('should maintain state correctly during navigation', () => {
    render(<PokemonApp />)
    
    // Start with list view
    expect(screen.getByTestId('pokemon-list')).toBeInTheDocument()
    
    // Navigate to detail view
    fireEvent.click(screen.getByText('Select Pokemon 1'))
    expect(screen.getByText('Pokemon ID: 1')).toBeInTheDocument()
    
    // Navigate back to list view
    fireEvent.click(screen.getByText('Back to List'))
    expect(screen.getByTestId('pokemon-list')).toBeInTheDocument()
  })
})
