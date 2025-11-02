import { describe, it, expect } from 'vitest'
import { capitalizeFirst } from './format'

describe('capitalizeFirst', () => {
  it('should capitalize the first letter of a lowercase string', () => {
    expect(capitalizeFirst('hello')).toBe('Hello')
  })

  it('should handle already capitalized strings', () => {
    expect(capitalizeFirst('World')).toBe('World')
  })

  it('should handle all uppercase strings', () => {
    expect(capitalizeFirst('TEST')).toBe('Test')
  })

  it('should handle empty strings', () => {
    expect(capitalizeFirst('')).toBe('')
  })

  it('should handle single character strings', () => {
    expect(capitalizeFirst('a')).toBe('A')
  })
})

