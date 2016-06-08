'use strict'
var fs = require('fs')
var pug = require('pug')
var jadeTpl = fs.readFileSync( './jade/index.jade', 'utf8' )

const tpl = pug.render(jadeTpl)
console.log(tpl)
