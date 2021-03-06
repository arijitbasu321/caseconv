#!/usr/bin/env node

const cc = require('../src/caseconv-main.js')
const package = require('../package.json')
const args = require('yargs')
    .scriptName('ccase')
    .version(package.version)
    .usage('Usage: $0 --type [camel|snake] --input <filename> --output <filename>')
    .example('Exmple: ccase --type snake --input sample1.js --output sample2.js')
    .option('t', {
        alias: 'type',
        describe: 'Choose case type: camel | snake',
        demandOption: true,
        type: "string",
        nargs: 1
    })
    .option('i', {
        alias: 'input',
        describe: 'Input file name',
        demandOption: true,
        type: "string",
        nargs: 1
    })
    .option('o', {
        alias: 'output',
        describe: 'Output file name',
        demandOption: true,
        type: "string",
        nargs: 1
    })
    .argv

cc.checkArgs(args)

let parameters = {
    inputFileName: args.input,
    outputFileName: args.output,
    changeType: args.type
}

cc.convert(parameters)

