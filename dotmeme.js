const { createCanvas, loadImage } = require('canvas')
var fs = require('fs'); // For reading files


filename = process.argv[2];
fs.readFile(filename, 'utf8', async function(err, data) {
    if (err) throw err;

    const parsedData = JSON.parse(data)

    loadImage(parsedData.imageDetails.backgroundImage).then((image) => {
    const canvas = createCanvas(image.width, image.height)
    const ctx = canvas.getContext('2d')

    ctx.drawImage(image, 0, 0, image.width, image.height)

    ctx.font = parsedData.textDetails.topTextFont
    ctx.fillText(parsedData.textDetails.topTextContent, 50, 100)

    const out = fs.createWriteStream(__dirname + '/test.png')
    const stream = canvas.createPNGStream()
    stream.pipe(out)
    out.on('finish', () =>  console.log('The PNG file was created.'))
})


});


