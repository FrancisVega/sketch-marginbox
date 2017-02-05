# sketch-marginbox
Simple scritp to create layers as margins

## Install
Download and double click in marginbox.sketchplugin

## How to use
With one or multiples groups (with margin data) selected execute the plugin or press cmd+j

## How to add margin data
The format of margin is like css:
- top-right-bottom-left (all)
- top right bottom left
- top/bottom left/right

To assign just one value add the letters T, R, B or L before the value

### Examples

Some Group Name **: 24** (all)

Some Group Name **: 16 32 64 32** (top right bottom left)

Some Group Name **: 64 8** (top/bottom left/right)

Some Group Name **: T8 R16** (top right)
