# Resolve Lnk

Easily extract destinations from Windows shortcut files (*.lnk)



**Benefits**

- Fast. Written in pure JS. 
- Tiny library! ( 3.85 KiB )
- Does not depend on external tools, Wscript or COM calls. 



## What are Lnk files?

Shell Link (.LNK) Binary File Format, which contains information that can be used to access another data object. The Shell Link Binary File Format is the format of Windows files with the extension "LNK".

Shortcuts on Windows, are lnk files. 



## Install ![All Tests](https://github.com/ashbeats/resolve-lnk/workflows/All%20Tests/badge.svg)

```bash
$ yarn add @recent-cli/resolve-lnk
```



## Usage

```javascript
const Lnk = require("@recent-cli/resolve-lnk")

// # Supports Buffer | Uint8Array input
let output = Lnk.resolveBuffer(
    fs.readFileSync()
); 

// # Supports path names. Returns a Promise
(async () => await Lnk.resolve("example.lnk"))();

```





#### Todo

- Add support for the browser	