let chunck = store => next => action => {

    if (typeof action == 'function') {
        return action(store.dispatch)

    } else {
        next(action)
    }
}

export default chunck
