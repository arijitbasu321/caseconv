const fs = require('fs')
const allowedArgs = ['i', 'o', 't', 'type', 'input', 'output', '_', '$0']
const supportedCase = ['snake', 'camel']

function checkArgs(args) {
    for(let arg in args) {
        if(!allowedArgs.includes(arg)){
            console.log(`Invalid argument ${arg}`)
            process.exit(1)
        }
    }

    if(!supportedCase.includes(args['type'])){
        console.log(`Unsupported case ${args['type']}`)
        process.exit(1)
    }
}

function isAlphabet(letter) {
    return (letter.match(/[A-Z|a-z]/i)) ? true : false
}

function isUpperCase(letter) {
    return (letter == letter.toUpperCase()) ? true : false 
}

function s2c(word) {
    wordArray = word.split('_')

    for(i=1;i<wordArray.length;i++) {
        wordArray[i] = wordArray[i][0].toUpperCase() + wordArray[i].substring(1)
    }

    return wordArray.join('')
}

function c2s(word) {
    let wordArray = word.split('')

    for(i=1;i<wordArray.length;i++) {
        if(isAlphabet(wordArray[i]) && isUpperCase(wordArray[i])) {
            wordArray[i] = '_' + wordArray[i].toLowerCase()
        }
    }

    return wordArray.join('')
}

function convert(params) {
    try {
        let data = fs.readFileSync(params.inputFileName, 'utf-8')
        let dataArray = data.split(/[\s,]+/)
        dataArray.pop('') //remove blank
        
        dataArray.forEach(word => {      
            if(word.includes('"') || word.includes('-') || isUpperCase(word[0])) {
                return false
            }

            if(params.changeType == 'camel' && word.includes('_')){
                let modifiedWord = s2c(word)
                data = data.replace(word, modifiedWord)
            }

            if(params.changeType == 'snake' && !word.includes('_')) {
                let modifiedWord = c2s(word)
                data = data.replace(word, modifiedWord)
            }
        })

        fs.writeFileSync(params.outputFileName, data)
    }
    catch (err) {
        if (err.code == 'ENOENT') {
            console.error('Input file does not exit!')
        }
        else {
            throw err;
        }
    }
}

module.exports = {
    checkArgs,
    convert
}