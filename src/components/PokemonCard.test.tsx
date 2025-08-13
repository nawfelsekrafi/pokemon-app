import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '../test/test-utils'
import { PokemonCard } from '../components/PokemonCard'

const mockPokemon: PokemonListItem = {
  name: 'pikachu',
  url: 'https://pokeapi.co/api/v2/pokemon/25/'
}

const mockOnClick = vi.fn()

describe('PokemonCard', () => {
  beforeEach(() => {
    mockOnClick.mockClear()
  })

  it('should render pokemon name and ID', () => {
    render(<PokemonCard pokemon={mockPokemon} onClick={mockOnClick} />)
    
    expect(screen.getByText('pikachu')).toBeInTheDocument()
    expect(screen.getByText('#025')).toBeInTheDocument()
  })

  it('should capitalize pokemon name', () => {
    render(<PokemonCard pokemon={mockPokemon} onClick={mockOnClick} />)
    
    const nameElement = screen.getByText('pikachu')
    expect(nameElement).toHaveClass('capitalize')
  })

  it('should render pokemon image with correct src', () => {
    render(<PokemonCard pokemon={mockPokemon} onClick={mockOnClick} />)
    
    const image = screen.getByAltText('pikachu')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png')
    expect(image).toHaveAttribute('loading', 'lazy')
  })

  it('should call onClick with pokemon ID when card is clicked', () => {
    render(<PokemonCard pokemon={mockPokemon} onClick={mockOnClick} />)
    
    const card = screen.getByRole('button')
    fireEvent.click(card)
    
    expect(mockOnClick).toHaveBeenCalledTimes(1)
    expect(mockOnClick).toHaveBeenCalledWith('25')
  })

  it('should call onClick when Enter key is pressed', () => {
    render(<PokemonCard pokemon={mockPokemon} onClick={mockOnClick} />)
    
    const card = screen.getByRole('button')
    fireEvent.keyDown(card, { key: 'Enter' })
    
    expect(mockOnClick).toHaveBeenCalledTimes(1)
    expect(mockOnClick).toHaveBeenCalledWith('25')
  })

  it('should call onClick when Space key is pressed', () => {
    render(<PokemonCard pokemon={mockPokemon} onClick={mockOnClick} />)
    
    const card = screen.getByRole('button')
    fireEvent.keyDown(card, { key: ' ' })
    
    expect(mockOnClick).toHaveBeenCalledTimes(1)
    expect(mockOnClick).toHaveBeenCalledWith('25')
  })

  it('should not call onClick for other keys', () => {
    render(<PokemonCard pokemon={mockPokemon} onClick={mockOnClick} />)
    
    const card = screen.getByRole('button')
    fireEvent.keyDown(card, { key: 'Escape' })
    
    expect(mockOnClick).not.toHaveBeenCalled()
  })

  it('should have correct styling classes', () => {
    const { container } = render(<PokemonCard pokemon={mockPokemon} onClick={mockOnClick} />)
    
    const card = container.firstChild as HTMLElement
    expect(card).toHaveClass(
      'bg-white',
      'rounded-lg',
      'shadow-md',
      'p-4',
      'cursor-pointer',
      'hover:shadow-lg',
      'transition-shadow',
      'duration-200',
      'border',
      'border-gray-200'
    )
  })

  it('should be keyboard accessible', () => {
    render(<PokemonCard pokemon={mockPokemon} onClick={mockOnClick} />)
    
    const card = screen.getByRole('button')
    expect(card).toHaveAttribute('tabIndex', '0')
  })

  it('should pad ID with leading zeros', () => {
    const singleDigitPokemon: PokemonListItem = {
      name: 'bulbasaur',
      url: 'https://pokeapi.co/api/v2/pokemon/1/'
    }
    
    render(<PokemonCard pokemon={singleDigitPokemon} onClick={mockOnClick} />)
    
    expect(screen.getByText('#001')).toBeInTheDocument()
  })

  it('should handle different pokemon URLs', () => {
    const differentPokemon: PokemonListItem = {
      name: 'charizard',
      url: 'https://pokeapi.co/api/v2/pokemon/6/'
    }
    
    render(<PokemonCard pokemon={differentPokemon} onClick={mockOnClick} />)
    
    expect(screen.getByText('charizard')).toBeInTheDocument()
    expect(screen.getByText('#006')).toBeInTheDocument()
    
    const image = screen.getByAltText('charizard')
    expect(image).toHaveAttribute('src', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png')
  })
})
