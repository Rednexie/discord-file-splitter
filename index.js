iconst path = require('path');
const { splitFile, combineFiles } = require('./core');
const fs = require('fs');


const cliArgs = process.argv.slice(2);
let method = cliArgs.shift()?.replaceAll('-', '')
const usageString = `Discord File Splitter\nnode ${path.basename(__filename)} <method> <file/s>`


if(method.startsWith('d')) method = method.replace('d', '') + "d"


if(!method || method.startsWith('h')){
    console.log(`Discord File Splitter - Usage`)
    console.log(`Splitting a file: node ${path.basename(__filename)} s <file>`);
    console.log(`Combining Files: node ${path.basename(__filename)} c <files> <files> ...`)
    process.exit(0);
}

if(!method.startsWith('s') && !method.startsWith('c')){
    console.log(usageString);
    console.log("Error: Method should be either 's', 'c' or 'h")
}


if(method.startsWith('s')){
    const file = cliArgs[0];
    if(!file){
        console.log(usageString)
        console.log("Error: File argument is needed to split")
        process.exit(1)
    }
    if(!fs.existsSync(file)){
        console.log("Error: The file does not exist")
        process.exit(1)
    }

    splitFile(file);
    if(method.includes('d')) fs.unlinkSync(file)
}
else if(method.startsWith('c')){
    if(fs.existsSync(file)){
        console.log("Error: The file does not exist")
        process.exit(1)
    }

    if(cliArgs.length === 0){
        console.log("File argument is needed to combine")
        process.exit(1)
    }
    combineFiles(cliArgs)
    if(method.includes('d')) cliArgs.forEach(file => fs.unlinkSync(file))
}
