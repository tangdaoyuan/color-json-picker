import yargs from 'yargs'
import colors from 'picocolors'
import type { PickArguments } from './command/pick'
import pick from './command/pick'

// eslint-disable-next-line no-unused-expressions
yargs
  .scriptName('c-picker')
  .usage('$0 <file>')
  .command<PickArguments>(
  '$0 [input]',
  'extract colors from input file and output',
  (args) => {
    args
      .option('input', {
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
      .demandOption(['input'], colors.yellow('\nPlease specify input file path\n'))
  },
  async(args) => {
    await pick(args)
  })
  .example('$0 -i ./input.json', 'extract colors')
  .showHelpOnFail(true)
  .alias('h', 'help')
  .alias('v', 'version')
  .help()
  .argv
