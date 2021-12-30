const { createCanvas, loadImage } = require('canvas')
var fs = require('fs'); // For reading files


filename = process.argv[2];
fs.readFile(filename, 'utf8', async function(err, data) {
    if (err) {
        console.error('Error reading .meme file:', err.message)
        return;
    }; // There was an error reading the .meme file.

    // Parse the JSON.
    const parsedData = JSON.parse(data)


    // TODO: make like everything better.
    loadImage(parsedData.imageDetails.backgroundImage).then((image) => {
    const canvas = createCanvas(image.width, image.height)
    const ctx = canvas.getContext('2d')

    ctx.drawImage(image, 0, 0, image.width, image.height)

    ctx.font = parsedData.textDetails.topTextFont
    ctx.fillText(parsedData.textDetails.topTextContent, 50, 100)

    const out = fs.createWriteStream(__dirname + `out.png`)
    const stream = canvas.createPNGStream()
    stream.pipe(out)
    out.on('finish', () =>  console.log(`Successfully assembled meme. (took ${process.uptime()} seconds)`))
})


});


