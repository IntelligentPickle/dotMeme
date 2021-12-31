# dotMeme

dotMeme is a meme compiler. It allows you to create memes using JSON, and compile them into an image.

## Usage
Do `yarn install` to install all of the dependencies. Then do:

```bash
node . foo.meme (or any json file with the right contents)
```

## Creating a .meme
A .meme file is just a regular JSON file, but renamed to an extension I thought was appropiate.

This is an example of a `.meme` file:
```json
{
    "dotMemeVer": "2",
    "background": "link_to_image",
    "textElements": [
        {
            "x": xPos,
            "y": yPos,
            "text": "text_contents",
            "font": "XYpx FontName",
            "color": "name_of_color/hex_code"
        }
    ],
    "imageElements": [
        {
            "x": xPos,
            "y": yPos,
            "url": "link_to_image"
        }
    ],
    "effects": ["someEffect"]
}
```

All of these values can be modified to your choosing, but **do not** change the structure, or else dotMeme will not be able to compile it correctly. For text content, escape characters (for example, `\n`) can be used.


## Contributing
Pull requests are welcome! Make sure that you file an issue for major changes.


## License
This repo uses the [GNU General Public Licence v3.0.](https://www.gnu.org/licenses/gpl-3.0.en.html)
