import { expect, it } from 'vitest'
import { parseColors } from '@'

it('runs', () => {
  const colors = parseColors({
    black1: '#000000',
    black2: '#000000',
  })
  expect(colors).toBeDefined()
  expect(colors).toMatchInlineSnapshot(`
    {
      "#000000": [
        "black1",
        "black2",
      ],
    }
  `)
})
