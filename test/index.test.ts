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

it('only color list', () => {
  const colors = parseColors({
    color1: '#601f02',
    color2: '#000033',
  }, false, true)
  expect(colors).toBeDefined()
  expect(colors).toMatchInlineSnapshot(`
    [
      "#601f02",
      "#000033",
    ]
  `)
})
