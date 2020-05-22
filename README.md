# Foobar

dotMeme is a program that allows you to make memes using JSON!

## Installing Dependencies

### node-canvas

From the node-canvas README:

OS | Command
----- | -----
OS X | Using [Homebrew](https://brew.sh/):<br/>`brew install pkg-config cairo pango libpng jpeg giflib librsvg`
Ubuntu | `sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev`
Fedora | `sudo yum install gcc-c++ cairo-devel pango-devel libjpeg-turbo-devel giflib-devel`
Solaris | `pkgin install cairo pango pkg-config xproto renderproto kbproto xextproto`
OpenBSD | `doas pkg_add cairo pango png jpeg giflib`
Windows | See the [wiki](https://github.com/Automattic/node-canvas/wiki/Installation:-Windows)
Others | See the [wiki](https://github.com/Automattic/node-canvas/wiki)

After you do the above, run `npm install`.

## Usage

```bash
node . foo.meme (or any json file with the right contents)
```

## Contributing
Pull requests are welcome! Make sure that you file an issue for major changes.


## License
This repo uses the [GNU General Public Licence v3.0.](https://www.gnu.org/licenses/gpl-3.0.en.html)
