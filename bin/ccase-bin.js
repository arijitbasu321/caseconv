#!/usr/bin/env node

//import modules
const cc = require('../src/ccase-main.js')
const package = require('../package.json')
const args = require('yargs')
    .scriptName('ccase')
    .version(package.version)
    .usage('Usage: $0 --type [camel|snake] --input <filename> --output <filename>')
    .example('Exmple: ccase --type snake --input sample1.js --output sample2.js')
    .option('t',{
        alias: 'type',
        describe: 'Choose case type: camel | snake',
        demandOption: true,
        type: "string",
        nargs: 1
    })
    .option('i',{
        alias: 'input',
        describe: 'Input file name',
        demandOption: true,
        type: "string",
        nargs: 1
    })
    .option('o',{
        alias: 'output',
        describe: 'Output file name',
        demandOption: true,
        type: "string",
        nargs: 1
    })
    .argv


//Check for vaild arguments
cc.checkArgs(args)

//Convert case
cc.convert(args['input'], args['output'], args['type'])

