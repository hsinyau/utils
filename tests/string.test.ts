import { describe, expect, it } from 'vitest'
import { camelize, dasherize, ensurePrefix, ensureSuffix, padZero, random, slash, underscored } from '../src/string'

describe('string', () => {
  it('slash', () => {
    expect(slash('\\')).toEqual('/')
    expect(slash('\\abc')).toEqual('/abc')
    expect(slash('\\a\\b\\c')).toEqual('/a/b/c')
  })

  it('random', () => {
    expect(random(16)).toHaveLength(16)
    expect(random(16)).toMatch(/^[\w-]+$/)
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

  it('camelize', () => {
    expect(camelize('foo-bar')).toEqual('fooBar')
    expect(camelize('foo_bar')).toEqual('fooBar')
    expect(camelize('fooBar')).toEqual('fooBar')
    expect(camelize('foo bar')).toEqual('foo bar')
    expect(camelize('foo-bar-baz')).toEqual('fooBarBaz')
    expect(camelize('foo_bar_baz')).toEqual('fooBarBaz')
    expect(camelize('fooBarBaz')).toEqual('fooBarBaz')
    expect(camelize('foo bar baz')).toEqual('foo bar baz')
  })

  it('underscored', () => {
    expect(underscored('fooBar')).toEqual('foo_bar')
    expect(underscored('fooBarBaz')).toEqual('foo_bar_baz')
    expect(underscored('foo bar')).toEqual('foo bar')
    expect(underscored('FooBar')).toEqual('foo_bar')
    expect(underscored('OvO')).toEqual('ov_o')
  })

  it('dasherize', () => {
    expect(dasherize('fooBar')).toEqual('foo-bar')
    expect(dasherize('fooBarBaz')).toEqual('foo-bar-baz')
    expect(dasherize('foo bar')).toEqual('foo bar')
    expect(dasherize('FooBar')).toEqual('foo-bar')
    expect(dasherize('foo-bar')).toEqual('foo-bar')
    expect(dasherize('foo_bar')).toEqual('foo-bar')
    expect(dasherize('foo bar baz')).toEqual('foo bar baz')
  })
})
