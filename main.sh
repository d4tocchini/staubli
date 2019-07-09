#!/bin/sh
# !/usr/local/bin/zsh
# /usr/local/d4/aelement/Electron.app/Contents/MacOS/Electron /usr/local/d4/proj_pag/web/index.html

# open -a "Google Chrome"

cd "$(dirname "${BASH_SOURCE[0]}")" && pwd

#  /usr/local/d4/aelib/app/e/build/Electron.app/Contents/MacOS/Electron "file://"${PWD}"/../Resources/web/index.html"

/usr/local/d4/aelib/app/e/build/Electron.app/Contents/MacOS/Electron ${PWD}"/../Resources/index.js"

# "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --app="file://"${PWD}"/../Resources/web/index.html"

# "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --app="file:///usr/local/d4/proj_pag/web/index.html"
