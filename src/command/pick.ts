import { readFile, writeFile } from 'fs/promises'
import path from 'path'
import type { ArgumentsCamelCase } from 'yargs'
import logger from '../logger'

export default async function(args: ArgumentsCamelCase<PickArguments>) {
  const { output, alpha, input } = args
  try {
    const content = await readFile(path.resolve(input), 'utf8')
    const colorJSON = JSON.parse(content)
    const ans = parseColors(colorJSON, alpha)
    logger.info(JSON.stringify(ans, null, 2))
    await writeFile(path.resolve(output), JSON.stringify(ans, null, 2))
  }
  catch (error: any) {
    logger.error(error?.message || error?.toString())
  }
}

export function parseColors(colors: JSON, alpha = false) {
  if (!colors)
    return {}
  const map = new Map<string, Set<string>>()

  function recursive(colors: JSON) {
    Object.keys(colors).forEach((key) => {
      const value = colors[key]

      if (typeof value === 'string') {
        let color = value as string
        if (/^[^\#]/.test(value))
          return
        if (!alpha)
          color = color.slice(0, 7)
        if (!map.has(color))
          map.set(color, new Set())

        map.get(color)!.add(key)
      }
      else if (colors[key]) {
        recursive(colors[key] as JSON)
      }
    })
  }
  recursive(colors)

  return Array
    .from(map.entries())
    .reduce((acc, [color, keys]) => {
      acc[color] = [...keys]
      return acc
    }, {} as JSON)
}

export interface PickArguments {
  output: string
  alpha: boolean
  input: string
}

export interface JSON {
  [key: string]: string | string[] | JSON
}
