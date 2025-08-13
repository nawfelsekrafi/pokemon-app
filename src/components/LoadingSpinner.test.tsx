import { describe, it, expect } from 'vitest'
import { render, screen } from '../test/test-utils'
import { LoadingSpinner } from '../components/LoadingSpinner'

describe('LoadingSpinner', () => {
  it('should render loading spinner with text', () => {
    render(<LoadingSpinner />)
    
    const loadingText = screen.getByText('Loading...')
    expect(loadingText).toBeInTheDocument()
  })

  it('should have correct container styling', () => {
    const { container } = render(<LoadingSpinner />)
    
    const spinnerContainer = container.firstChild as HTMLElement
    expect(spinnerContainer).toHaveClass('flex', 'justify-center', 'items-center', 'py-8')
  })

  it('should render Loader2 icon with spin animation', () => {
    const { container } = render(<LoadingSpinner />)
    
    const loader = container.querySelector('svg')
    expect(loader).toBeInTheDocument()
    expect(loader).toHaveClass('w-8', 'h-8', 'animate-spin', 'text-blue-500')
  })

  it('should have proper text styling', () => {
    render(<LoadingSpinner />)
    
    const loadingText = screen.getByText('Loading...')
    expect(loadingText).toHaveClass('ml-2', 'text-gray-600')
  })
})
