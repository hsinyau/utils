import { describe, expect, it } from 'vitest'
import { ensurePrefix, ensureSuffix, padZero, randomString, slash } from '../src/string'

describe('string', () => {
  it('slash', () => {
    expect(slash('\\')).toEqual('/')
    expect(slash('\\abc')).toEqual('/abc')
    expect(slash('\\a\\b\\c')).toEqual('/a/b/c')
  })

  it('randomString', () => {
    expect(randomString(16)).toHaveLength(16)
    expect(randomString(16)).toMatch(/^[\w-]+$/)
  })

  it('ensurePrefix', () => {
    expect(ensurePrefix('http://', 'www.google.com')).toEqual('http://www.google.com')
    expect(ensurePrefix('https://', 'www.google.com')).toEqual('https://www.google.com')
  })

  it('ensureSuffix', () => {
    expect(ensureSuffix('.png', 'example')).toEqual('example.png')
    expect(ensureSuffix('.png', 'example.png')).toEqual('example.png')
  })

  it('padZero', () => {
    expect(padZero(13579, 10)).toEqual('0000013579')
    expect(padZero(13579, 8, 'end')).toEqual('13579000')
    expect(padZero(13579, 10, 'start')).toEqual('0000013579')
    expect(padZero(24680, 0, 'end')).toEqual('24680')
  })
})
