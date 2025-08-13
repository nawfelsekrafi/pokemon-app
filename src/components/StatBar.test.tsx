import { describe, it, expect } from 'vitest'
import { render, screen } from '../test/test-utils'
import { StatBar } from '../components/StatBar'

describe('StatBar', () => {
  it('should render stat label and value', () => {
    render(<StatBar label="attack" value={80} />)
    
    const label = screen.getByText('attack')
    const value = screen.getByText('80')
    
    expect(label).toBeInTheDocument()
    expect(value).toBeInTheDocument()
  })

  it('should replace hyphens with spaces in label', () => {
    render(<StatBar label="special-attack" value={75} />)
    
    const label = screen.getByText('special attack')
    expect(label).toBeInTheDocument()
  })

  it('should capitalize label', () => {
    render(<StatBar label="defense" value={60} />)
    
    const label = screen.getByText('defense')
    expect(label).toHaveClass('capitalize')
  })

  it('should calculate correct percentage for progress bar', () => {
    const { container } = render(<StatBar label="hp" value={50} maxValue={100} />)
    
    const progressBar = container.querySelector('.bg-blue-500')
    expect(progressBar).toHaveStyle({ width: '50%' })
  })

  it('should use default max value of 200', () => {
    const { container } = render(<StatBar label="speed" value={100} />)
    
    const progressBar = container.querySelector('.bg-blue-500')
    expect(progressBar).toHaveStyle({ width: '50%' }) // 100/200 = 50%
  })

  it('should cap percentage at 100%', () => {
    const { container } = render(<StatBar label="attack" value={300} maxValue={100} />)
    
    const progressBar = container.querySelector('.bg-blue-500')
    expect(progressBar).toHaveStyle({ width: '100%' })
  })

  it('should handle zero value', () => {
    const { container } = render(<StatBar label="defense" value={0} />)
    
    const progressBar = container.querySelector('.bg-blue-500')
    expect(progressBar).toHaveStyle({ width: '0%' })
    
    const value = screen.getByText('0')
    expect(value).toBeInTheDocument()
  })

  it('should have correct styling classes', () => {
    const { container } = render(<StatBar label="hp" value={75} />)
    
    const mainContainer = container.firstChild as HTMLElement
    expect(mainContainer).toHaveClass('mb-3')
    
    const label = screen.getByText('hp')
    expect(label).toHaveClass('text-sm', 'font-medium', 'text-gray-700', 'capitalize')
    
    const value = screen.getByText('75')
    expect(value).toHaveClass('text-sm', 'text-gray-600')
    
    const progressContainer = container.querySelector('.w-full.bg-gray-200')
    expect(progressContainer).toHaveClass('rounded-full', 'h-2')
    
    const progressBar = container.querySelector('.bg-blue-500')
    expect(progressBar).toHaveClass('h-2', 'rounded-full', 'transition-all', 'duration-300')
  })
})
