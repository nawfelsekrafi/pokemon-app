import { describe, it, expect } from 'vitest'
import { extractIdFromUrl, capitalizeFirstLetter, getTypeColor } from '../utils/helpers'

describe('Helper Functions', () => {
  describe('extractIdFromUrl', () => {
    it('should extract ID from Pokemon API URL', () => {
      const url = 'https://pokeapi.co/api/v2/pokemon/25/'
      const result = extractIdFromUrl(url)
      expect(result).toBe('25')
    })

    it('should extract ID from URL without trailing slash', () => {
      const url = 'https://pokeapi.co/api/v2/pokemon/1'
      const result = extractIdFromUrl(url)
      expect(result).toBe('pokemon')
    })

    it('should handle different URL formats', () => {
      const url = 'https://pokeapi.co/api/v2/pokemon/150/'
      const result = extractIdFromUrl(url)
      expect(result).toBe('150')
    })
  })

  describe('capitalizeFirstLetter', () => {
    it('should capitalize the first letter of a lowercase string', () => {
      const result = capitalizeFirstLetter('pokemon')
      expect(result).toBe('Pokemon')
    })

    it('should handle already capitalized strings', () => {
      const result = capitalizeFirstLetter('Pokemon')
      expect(result).toBe('Pokemon')
    })

    it('should handle single character strings', () => {
      const result = capitalizeFirstLetter('a')
      expect(result).toBe('A')
    })

    it('should handle empty strings', () => {
      const result = capitalizeFirstLetter('')
      expect(result).toBe('')
    })

    it('should handle strings with special characters', () => {
      const result = capitalizeFirstLetter('mr. mime')
      expect(result).toBe('Mr. mime')
    })
  })

  describe('getTypeColor', () => {
    it('should return correct color for fire type', () => {
      const result = getTypeColor('fire')
      expect(result).toBe('bg-red-500')
    })

    it('should return correct color for water type', () => {
      const result = getTypeColor('water')
      expect(result).toBe('bg-blue-500')
    })

    it('should return correct color for grass type', () => {
      const result = getTypeColor('grass')
      expect(result).toBe('bg-green-500')
    })

    it('should return correct color for electric type', () => {
      const result = getTypeColor('electric')
      expect(result).toBe('bg-yellow-400')
    })

    it('should return default color for unknown type', () => {
      const result = getTypeColor('unknown-type')
      expect(result).toBe('bg-gray-400')
    })

    it('should return default color for empty string', () => {
      const result = getTypeColor('')
      expect(result).toBe('bg-gray-400')
    })

    it('should handle all defined types', () => {
      const definedTypes = [
        'normal', 'fire', 'water', 'electric', 'grass', 'ice',
        'fighting', 'poison', 'ground', 'flying', 'psychic',
        'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
      ]

      definedTypes.forEach(type => {
        const result = getTypeColor(type)
        expect(result).toMatch(/^bg-/)
        expect(result).not.toBe('bg-gray-400') // Should not be default for defined types
      })
    })
  })
})
