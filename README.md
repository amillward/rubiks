# rubiks

Simple program that will mimic rubiks cube turns in the command line

````
                          ||===|===|===||
                          || y | y | y ||
                          ||---|---|---||
                          || y | y | y ||
                          ||---|---|---||
                          || y | y | y ||
||===|===|===||===|===|===||===|===|===||===|===|===||
|| o | o | o || b | b | b || r | r | r || g | g | g ||
||---|---|---||---|---|---||---|---|---||---|---|---||
|| o | o | o || b | b | b || r | r | r || g | g | g ||
||---|---|---||---|---|---||---|---|---||---|---|---||
|| o | o | o || b | b | b || r | r | r || g | g | g ||
||===|===|===||===|===|===||===|===|===||===|===|===||
                          || w | w | w ||
                          ||---|---|---||
                          || w | w | w ||
                          ||---|---|---||
                          || w | w | w ||
                          ||===|===|===||

prompt: turn:

````

## Quick start

    npm i
    npm start

When prompted, use letters below to rotate corresponding face:

    y: yellow
    w: white
    r: red
    o: orange
    b: blue
    g: green

Send any other character into the prompt to quit

## Run tests

    npm test
