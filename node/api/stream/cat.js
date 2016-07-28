let filepath = process.argv.slice(2)[0]
let fs = require('fs')
fs.createReadStream(filepath).pipe(process.stdout)
