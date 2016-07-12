'use strict'

let fs = require('fs')

const dir = './pages/'

let arr = fs.readdirSync(dir)

let maps = {}
arr.map(item=>{
    let file = `${dir}${item}/index.js`
    if( fs.statSync(file) ) {
        maps[item] = file
    }
})

console.log(maps);

module.exports = maps
