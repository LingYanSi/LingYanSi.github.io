var ss = store => next => action => {
    // next其实就是dispatch

    setTimeout(function(){
        console.log('延迟执行')
        next(action)
    },1000)

}

export default ss
