import { expect } from 'vitest'
import { foo } from '../src'

it('simple', () => {
  expect(foo).toBe('foo')
})
