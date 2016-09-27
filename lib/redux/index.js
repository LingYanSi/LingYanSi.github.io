// store
var store = {
    user: {
        name: '周恩来',
        avatar: 'http://dev.weipaitang.com/mmopen/20160726PiajxSqBRaEKN7dzbhsia0iapaDbPiaBG8nqNVAG0xXWDR8SBTUDoY7picEK9OfDckfLibl1WZZFSEIdu0GmVfgBrOaA/w/96'
    }
}

// 用来生成新的state
function reducer(state, action) {
    let {
        type,
        data
    } = action

    switch (type) {
        case 'fuck':
            // 因为assign只是浅copy，因此并不是最佳选择，因此让我们使用不可变数据immutable
            return Object.assign({}, state, {
                user: {
                    name: data.name
                }
            })
        default:
            return
    }
}

// dispatch 一个action， reducer接收到action，返回一个新的state， 然后执行更新程序
function dispatch(action) {
    // 获取的state后

    if (typeof action == 'function') {
        //
        return new Promise((resolve, reject) => {
            action(dispatch)
        })
    }

    store = reducer(store, action)
    // 更新UI，是异步的，其作用在于把同步的改变收集到一起，再去更新，效率更高
    render(store)
}

document.querySelector('button').onclick = function(event) {
    dispatch({
            type: 'fuck',
            data: {
                name: event.target.previousElementSibling.value
            }
        })
}

document.querySelector('.async').onclick = function(event) {
    dispatch((dispatch)=>{
        setTimeout(() => {
            dispatch({
                type: 'fuck',
                data: {
                    name: 'async的直播'
                }
            })
        }, 3000)
    })
}

function render(state) {

    document.querySelector('#app').innerHTML = `
        <h1>${state.user.name}</h1>
        <img src="${state.user.avatar}" alt="" />
    `
}

var a = Immutable.Map({
    a: 1,
    b: {
        name: 'hahha',
        age: 11
    }
})
