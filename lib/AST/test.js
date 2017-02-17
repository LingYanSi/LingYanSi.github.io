let tiny = require('./demo')

let result = tiny.compiler('(add 1.1 2 (fuck 1 2) (fuck 1 2) 1 200) (add 1 2)')
console.log(result)
