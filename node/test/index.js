let {exec} = require('child_process')

exec('make fuck', (err, result)=>{
    console.log(err, result)
})
