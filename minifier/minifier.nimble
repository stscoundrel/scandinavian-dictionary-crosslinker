# Package

version       = "0.1.0"
author        = "stscoundrel / Sampo Silvennoinen"
description   = "Minifies crosslink output for scandinavian-dictionary-crosslinker"
license       = "MIT"
srcDir        = "src"
bin           = @["minifier"]


# Dependencies

requires "nim >= 1.6.0", "zippy >= 0.10.11"
