const { createCanvas, loadImage } = require('canvas')
const fs = require('fs'); // For reading files
const logger = require('./logger') // Set up default logger
const winston = require('winston')

if (!process.argv[2]) {
    logger.error('Missing .meme argument.')
    return;
}
fs.readFile(process.argv[2], 'utf8', async function(err, data) {
    if (err) {
        logger.error(`Error reading .meme file: \x1b[1m${err.message}\x1b[0m`)
        return;
    }; // There was an error reading the .meme file.

    // Parse the JSON.
    const parsedData = JSON.parse(data)
    logger.info('Parsed JSON.')

    // TODO: make like everything better.
    loadImage(parsedData.background).then((image) => {
    logger.info(`Loaded background.`)
    logger.info(`Canvas will be created with dimensions from bg: ${image.width}x${image.height}`)
    const canvas = createCanvas(image.width, image.height);
    const ctx = canvas.getContext('2d')
    ctx.drawImage(image, 0, 0, image.width, image.height)
    logger.info('Canvas created with background. Now writing text elements.')

    parsedData.textElements.forEach(element => {
        ctx.font = element.font
        ctx.fillStyle = element.color
        ctx.fillText(element.text, element.x, element.y)
    });

    const out = fs.createWriteStream(`outA.png`)
    const stream = canvas.createPNGStream()
    stream.pipe(out)
    out.on('finish', () =>  console.log(`Successfully assembled meme. (took ${process.uptime()} seconds)`))
})


});


