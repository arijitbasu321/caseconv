const fs = require('fs')

function checkArgs(args) {

    const allowedArgs = ['i', 'o', 't', 'type', 'input', 'output', '_', '$0']
    const supportedCase = ['snake', 'camel']
    
    for(let arg in args) 
    {
        if(!allowedArgs.includes(arg))
        {
            console.log(`Invalid argument ${arg}`)
            process.exit(1)
        }
    }


    if(!supportedCase.includes(args['type']))
    {
        console.log(`Unsupported case ${args['type']}`)
        process.exit(1)
    }
}

function readInputFile(file) {

    try {
        let data = fs.readFileSync(file, 'utf-8')
        return data
    }
    catch (err) {
        console.log('Input file does not exist')
        process.exit(1)
    }
    
   

}

function writeOutputFile(fileName, data) {

    fs.writeFileSync(fileName, data)

}


function convert(data, changeType) {

    let dataArray = data.split(/[\s,]+/)

    dataArray.forEach(word => {
        if(!word.includes('"'))
        {
            if(changeType == 'camel' && word.includes('_'))
            {
                let modifiedWord = s2c(word)
                data = data.replace(word, modifiedWord)
            }
            else if(changeType == 'snake' && !word.includes('_')) 
            {
                let modifiedWord = c2s(word)
                data = data.replace(word, modifiedWord)
            }
        }
    })

    return data
}

function s2c(word) {

    wordArray = word.split('_')
    for(i=1;i<wordArray.length;i++)
    {
        wordArray[i] = wordArray[i][0].toUpperCase() + wordArray[i].substring(1)
    }

    return wordArray.join('')
}

function c2s(word) {

    let wordArray = word.split('')
    for(i=1;i<wordArray.length;i++)
    {
        if(wordArray[i] == wordArray[i].toUpperCase() && wordArray[i].match(/[A-Z|a-z]/i))
        {
            wordArray[i] = '_' + wordArray[i].toLowerCase()
        }
    }

    return wordArray.join('')
}

module.exports = {
    checkArgs,
    readInputFile,
    writeOutputFile,
    convert,
    s2c,
    c2s
}