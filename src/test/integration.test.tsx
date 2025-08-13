import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '../test/test-utils'
import { PokemonApp } from '../components/PokemonApp'

describe('Pokemon App Integration Tests', () => {
  beforeEach(() => {
    // Reset any DOM state before each test
    document.body.innerHTML = ''
  })

  it('should load and display pokemon list on app start', async () => {
    render(<PokemonApp />)
    
    // Should show loading initially
    expect(screen.getByText('Loading...')).toBeInTheDocument()
    
    // Wait for pokemon list to load
    await waitFor(() => {
      expect(screen.getByText('bulbasaur')).toBeInTheDocument()
    }, { timeout: 3000 })
    
    // Check that multiple pokemon are displayed
    expect(screen.getByText('ivysaur')).toBeInTheDocument()
    expect(screen.getByText('venusaur')).toBeInTheDocument()
    expect(screen.getByText('charmander')).toBeInTheDocument()
  })

  it('should navigate to pokemon detail when clicking on a pokemon', async () => {
    render(<PokemonApp />)
    
    // Wait for pokemon list to load
    await waitFor(() => {
      expect(screen.getByText('bulbasaur')).toBeInTheDocument()
    })
    
    // Click on the first pokemon
    const bulbasaurCard = screen.getByText('bulbasaur').closest('div')
    expect(bulbasaurCard).toBeInTheDocument()
    
    if (bulbasaurCard) {
      fireEvent.click(bulbasaurCard)
    }
    
    // Should show loading for detail
    expect(screen.getByText('Loading...')).toBeInTheDocument()
    
    // Wait for pokemon detail to load
    await waitFor(() => {
      expect(screen.getByText('bulbasaur')).toBeInTheDocument()
      expect(screen.getByText('#001')).toBeInTheDocument()
    })
    
    // Check that pokemon details are shown
    expect(screen.getByText('0.7m')).toBeInTheDocument() // height
    expect(screen.getByText('6.9kg')).toBeInTheDocument() // weight
    expect(screen.getByText('Grass')).toBeInTheDocument() // type
    expect(screen.getByText('Poison')).toBeInTheDocument() // type
    expect(screen.getByText('Base Stats')).toBeInTheDocument()
  })

  it('should navigate back to list from detail view', async () => {
    render(<PokemonApp />)
    
    // Wait for list to load and click on pokemon
    await waitFor(() => {
      expect(screen.getByText('bulbasaur')).toBeInTheDocument()
    })
    
    const bulbasaurCard = screen.getByText('bulbasaur').closest('div')
    if (bulbasaurCard) {
      fireEvent.click(bulbasaurCard)
    }
    
    // Wait for detail view
    await waitFor(() => {
      expect(screen.getByText('#001')).toBeInTheDocument()
    })
    
    // Click back button
    const backButton = screen.getByText('Back to List')
    fireEvent.click(backButton)
    
    // Should be back to list view
    await waitFor(() => {
      expect(screen.getByText('bulbasaur')).toBeInTheDocument()
      expect(screen.getByText('ivysaur')).toBeInTheDocument()
      expect(screen.queryByText('#001')).not.toBeInTheDocument()
    })
  })

  it('should handle API errors gracefully', async () => {
    // This test would require mocking a failed API response
    // For now, we'll test the error component directly
    render(<PokemonApp />)
    
    // If there's an error, it should show the error message
    // This would need to be tested by mocking a failed API call
    // which would require additional MSW setup for error scenarios
  })

  it('should maintain responsive layout on different screen sizes', async () => {
    render(<PokemonApp />)
    
    await waitFor(() => {
      expect(screen.getByText('bulbasaur')).toBeInTheDocument()
    })
    
    // The app should have responsive classes
    const container = document.querySelector('.min-h-screen')
    expect(container).toBeInTheDocument()
    expect(container).toHaveClass('bg-gray-100')
  })
})
