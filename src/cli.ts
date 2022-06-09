import yargs from 'yargs'
import type { PickArguments } from './command/pick'
import pick from './command/pick'

// eslint-disable-next-line no-unused-expressions
yargs
  .scriptName('c-picker')
  .usage('$0 [args]')
  .command<PickArguments>(
  '$0 <input>',
  'Run the color-json-picker cli',
  (args) => {
    args
      .positional('input', {
        alias: 'i',
        type: 'string',
        describe: 'single colors json file path',
      })
      .option('output', {
        alias: 'o',
        type: 'string',
        default: './output/output.json',
        describe: 'output json file path',
      })
      .option('alpha', {
        alias: 'a',
        type: 'boolean',
        default: false,
        describe: 'classified by alpha',
      })
  },
  async(args) => {
    await pick(args)
  },
)
  .showHelpOnFail(false)
  .alias('h', 'help')
  .alias('v', 'version')
  .help()
  .argv
