// 处理订阅
function sub(fn){
    sub.arr = sub.arr || []
    sub.arr.push(fn)
}
// dispatch 一个action， reducer接收到action，返回一个新的state， 然后执行更新程序
function dispatch(action) {
    // 获取的state后
    // 如果是函数就执行函数
    state = combineReducer(state, action)
    // 更新UI，是异步的，其作用在于把同步的改变收集到一起，再去更新，效率更高

    // 这里应该是异步的
    sub.arr.forEach(item=> item(state))
}

var state = null
// 处理store
function createStore(newStore){
    state = newStore
}

var store = {
    getState(){
        return state
    },
    dispatch ,
    sub ,
}


// 添加中间件
function addMiddlewares(...middlewares){
    middlewares.reverse()
    middlewares.forEach(md => {
        // 返回一个新的dispatch
        dispatch = md(store)(dispatch)
    })
    return dispatch
}

// 混合后的reducer
function combineReducer(...arg){
    let result = null
    combine.arr.some(item => {
        result = item(...arg)
        return result
    })
    // 如果是null，就使用原来的state
    return result ? result : state
}

// 收集多个reducer
function combine (...reducers) {
    let arr = combine.arr = combine.arr || []
    arr.push(...reducers)
}


// 然而，目前这种处理方式还会有一些问题，因为此redux无法复用
export {
    combine,
    addMiddlewares,
    dispatch,
    createStore,
    sub,
    store
}
