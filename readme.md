## Not ready for use (Ultra Alpha)

This readme will not make much sense till it's in v1.0.0 

## LNK-Parser

`yarn add @recent-cli/resolve-lnk`

This only extracts the destination from \*.lnk files.

Does not depend on ffi, com or cmd utilities. All parsing is done in basic js.

See tests for more usage.

Tiny (3.6kb) with no-dependencies
  
```
const d = resolve_lnk_basic(bytes)
```

# Created for
- @recent-cli project (Windows recent file's in cli)

# TODO
   [X] Remove directory limitation from the project. Move that to `@recent-cli/lnk-plugin`

Resources Used:
===
https://github.com/EricZimmerman/Lnk
