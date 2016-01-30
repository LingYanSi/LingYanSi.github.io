
var a = new Promise(function(resovel, reject){
    setTimeout(()=> resovel(100)  , 2000)
}) ;

var b = new Promise((reslove)=>{
    setTimeout(()=> reslove('b'), 1000 )
})

// 所有的都完成
Promise.all([a,b]).then((value)=>{
    console.log('Promise all',value)
})

// 多个promise对象，有一个完成即可
Promise.race([a,b]).then((value)=>{
    console.log('Promise all',value)
})

// 打印结果，setTimeout，要比Promise先执行
setTimeout(()=>{ console.log('setTimeout时间')}, 1000);

new Promise((resolve, reject)=>{
    reject('失败了')
}).catch((msg)=>{
    console.log(msg)
})

// Promise.resolve() Promise.reject() 用于将其他对象转换成为Promise对象
// 会根据是否有then方法被调用
var other = {
    muji(){
        return this
    },
    heihei(){
        console.log('立即执行')
    },
    then( callback ){
        console.log('4s后执行')
        callback()
    }
}
// 这个地方如何异步呢
Promise.resolve( other.muji() ).then( ()=>{ console.log('Promise.resolve一个对象为Promise')} )

console.log('this:',this,'global:',global)
