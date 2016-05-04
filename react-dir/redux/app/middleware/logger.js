var ss = store => next => action => {
    // next其实就是dispatch

    setTimeout(function(){
        console.log(action)
        next(action)
        console.log(store.getState())
    },1000)

}

export default ss
