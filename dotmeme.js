const { createCanvas, loadImage } = require('canvas')
const fs = require('fs'); // For reading files
const logger = require('./logger') // Set up default logger
const winston = require('winston')
const path = require('path')
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
    try {
        const parsedData = JSON.parse(data);
        logger.info('Parsed JSON.');
    } catch {
        logger.error('Failed to parse .meme file. Is it a proper JSON file?')
        return;
    }

    // TODO: make like everything better.
    loadImage(parsedData.background).then((image) => {
        logger.info(`Loaded background.`)
        logger.info(`Dimensions from bg: ${image.width}x${image.height}`)
        const canvas = createCanvas(image.width, image.height);
        const ctx = canvas.getContext('2d')
        ctx.drawImage(image, 0, 0, image.width, image.height)
        logger.info('Writing elements.')
        parsedData.imageElements.forEach(async (element, i) => {
            logger.info(`[IMG] ${i} - X:${element.x} Y:${element.y} URL:${element.url}`)

            await loadImage(element.url).then((image) => {
                ctx.drawImage(image, element.x , element.y)
            }).catch(err => {
                logger.error(`Failed to render img element ${i}: ${err}`)
            })
        });
        parsedData.textElements.forEach(async (element, i) => {
            logger.info(`[TXT] ${i} - X: ${element.x} Y: ${element.y} CONT: ${element.text}`)
            ctx.font = element.font
            ctx.fillStyle = element.color
            ctx.fillText(element.text, element.x, element.y)
        });

        const out = fs.createWriteStream(`${path.basename(process.argv[2], '.meme')}.png`)
        const stream = canvas.createPNGStream()
        stream.pipe(out)
        out.on('finish', () =>  logger.info(`Successfully assembled meme as ${path.basename(process.argv[2], '.meme')}.png`))
    })


});


