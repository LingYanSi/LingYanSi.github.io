
 require('babel-polyfill')

async function mama(){
    var name = await new Promise((resolve)=>{
        setTimeout(()=> resolve('庆丰帝'), 2000)
    })

    console.log( name )
}

mama(); 
