let logger = store => next => action => {
    console.log('进入: 1', store.getState())
    next(action)
    console.log('出去: 1', store.getState())
}

export default logger
