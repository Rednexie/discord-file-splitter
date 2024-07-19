const fs = require('fs');
const path = require('path');

function splitFile(filePath) {
    const fileStats = fs.statSync(filePath);
    const fileSize = fileStats.size;
    const partSize = 500 * 1024 * 1024;

    const numParts = Math.ceil(fileSize / partSize);

    const parts = [];

    let currentPosition = 0;

    for (let i = 1; i <= numParts; i++) {
        const chunkSize = Math.min(partSize, fileSize - currentPosition);
        const buffer = Buffer.alloc(chunkSize);

        const fd = fs.openSync(filePath, 'r');
        fs.readSync(fd, buffer, 0, chunkSize, currentPosition);
        fs.closeSync(fd);

        const partFilePath = `${path.join(path.dirname(filePath), `part.${i}.${path.basename(filePath)}` )}`
        fs.writeFileSync(partFilePath, buffer);

        parts.push(partFilePath);

        currentPosition += chunkSize;
    }

    return parts;
}


function combineFiles(filePaths) {
    const outputFilePath = filePaths[0].split('.part.1')[1];
    const writableStream = fs.createWriteStream(outputFilePath);

    for (let filePath of filePaths) {
        const data = fs.readFileSync(filePath);
        writableStream.write(data);
        fs.unlinkSync(filePath); 
    }

    writableStream.end();
}


async function splitFile_(filePath) {
    const fileStats = await fs.promises.stat(filePath);
    const fileSize = fileStats.size;
    const partSize = 500 * 1024 * 1024;

    const numParts = Math.ceil(fileSize / partSize);

    const parts = [];

    let currentPosition = 0;

    for (let i = 1; i <= numParts; i++) {
        const chunkSize = Math.min(partSize, fileSize - currentPosition);
        const buffer = Buffer.alloc(chunkSize);

        const fd = await fs.promises.open(filePath, 'r');
        await fs.promises.read(fd, buffer, 0, chunkSize, currentPosition);
        await fs.promises.close(fd);

        const partFilePath = `${path.join(path.dirname(filePath), `part.${i}.${path.basename(filePath)}` )}`
        await fs.promises.writeFile(partFilePath, buffer);

        parts.push(partFilePath);

        currentPosition += chunkSize;
    }

    return parts;
}


async function combineFiles_(filePaths) {
    const writableStream = fs.promises.createWriteStream(outputFilePath);
    const outputFilePath = filePaths[0].split('.part.1')[1];
    for (let filePath of filePaths) {
        const data = await fs.promises.readFile(filePath);
        await writableStream.write(data);
        await fs.promises.unlink(filePath);
    }

    writableStream.end();
}

module.exports = {
    splitFile,
    combineFiles
};
module.exports.promises = {
    splitFile: splitFile_,
    combineFiles: combineFiles_
}
