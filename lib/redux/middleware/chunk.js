let chunck = store => next => action => {

    if (typeof action == 'function') {
        console.log('action为function')
        return action()

    } else {
        console.log('action为对象')
        next(action)
    }
}

export default chunck
