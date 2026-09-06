# Time-Asci-Art

## Pleasure and fun for the entire family

### Installation:
``` bash
npm install -g time-asci-art
```

### Usage:

| Command    | Description                              |
| ---------- | ---------------------------------------- |
| `art time` | Prints the current time as ASCII art     |
| `art date` | Prints the current date as ASCII art     |
| `art now`  | Prints the current date and time as ASCII art |
| `art --version` (or `art -v`) | Prints the package name and version |

### Colors:
You can add a color name as a third word to print the ASCII art in that color:
```bash
art now red
```
If no color is given, the default is **yellow**. An unknown color name also falls back to yellow.

Supported colors: `red`, `green`, `blue`, `black`, `yellow`, `magenta`, `cyan`, `white`, `gray`, and fun styles like `rainbow`, `zebra`, `america`, `trap`, `random`.

#### Example:
```bash
art date
```
Prints the current date as ASCII art:
```
 _____              ____             ___    ____   ___ ____   __  
|_   _|   _  ___   / ___|  ___ _ __ / _ \  |___ \ / _ \___ \ / /_ 
  | || | | |/ _ \  \___ \ / _ \ '_ \ | | |   __) | | | |__) | '_ \ 
  | || |_| |  __/   ___) |  __/ |_) | |_| |  / __/| |_| / __/| (_) |
  |_| \__,_|\___|  |____/ \___| .__/ \___/  |_____|\___/_____|\___/ 
                              |_|                                  
```
Any other input will print a usage message.

Happy coding :-)
