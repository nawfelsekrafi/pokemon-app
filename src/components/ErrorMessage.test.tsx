import { describe, it, expect } from 'vitest'
import { render, screen } from '../test/test-utils'
import { ErrorMessage } from '../components/ErrorMessage'

describe('ErrorMessage', () => {
  it('should render error message with custom text', () => {
    const customMessage = 'Failed to load Pokemon data'
    render(<ErrorMessage message={customMessage} />)
    
    const errorTitle = screen.getByText('Oops! Something went wrong')
    const errorMessage = screen.getByText(customMessage)
    
    expect(errorTitle).toBeInTheDocument()
    expect(errorMessage).toBeInTheDocument()
  })

  it('should have correct styling for error container', () => {
    const { container } = render(<ErrorMessage message="Test error" />)
    
    const errorContainer = container.firstChild as HTMLElement
    expect(errorContainer).toHaveClass('text-center', 'py-8', 'text-red-600')
  })

  it('should style title correctly', () => {
    render(<ErrorMessage message="Test error" />)
    
    const title = screen.getByText('Oops! Something went wrong')
    expect(title).toHaveClass('text-lg', 'font-semibold')
  })

  it('should style message correctly', () => {
    const testMessage = 'This is a test error message'
    render(<ErrorMessage message={testMessage} />)
    
    const message = screen.getByText(testMessage)
    expect(message).toHaveClass('text-sm', 'mt-2')
  })

  it('should handle empty message', () => {
    render(<ErrorMessage message="" />)
    
    const errorTitle = screen.getByText('Oops! Something went wrong')
    const errorMessage = screen.getByText('')
    
    expect(errorTitle).toBeInTheDocument()
    expect(errorMessage).toBeInTheDocument()
  })
})
