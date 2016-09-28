import {
    combine,
    addMiddlewares,
    createStore,
    sub
} from './redux'

import store from './store'

// 中间件
import logger from './middleware/logger'
import chunk from './middleware/chunk'
import history,{appHistory} from './middleware/history'

// action
import change_user_name from './action/change_user_name'
import delete_list_item from './action/delete_list_item'
import fetch_start from './action/fetch_start'
import prev_step from './action/prev_step'

createStore(store)
let dispatch = addMiddlewares(logger, chunk, history)


// 用户触发的动作
document.querySelector('button').onclick = function(event) {
    let name = event.target.previousElementSibling.value
    dispatch(change_user_name(name))
}


document.querySelector('body').onclick = function(event) {
    if(event.target.classList.contains('del')) {
        dispatch(delete_list_item( event.target.dataset['id'] ) )
    }

    if(event.target.classList.contains('history')) {
        let id = event.target.dataset['id']
        dispatch(prev_step( appHistory[id].state ) )
    }
}

document.querySelector('.async').onclick = function(event) {
    // 同步任务
    dispatch(fetch_start())

    // 异步任务
    dispatch(()=>{
        // 异步任务
        setTimeout(() => {
            dispatch(change_user_name('async的直播'))
        }, 1000)
    })
}

// render
function render(state) {
    console.log(state);

    document.querySelector('#app').innerHTML = `
        <h1>${state.user.name}</h1>
        <h2>${state.fetch}</h2>
        <img src="${state.user.avatar}" alt="" style="width: 100px; height: 100px; object-fit: cover;" />
        <ul>
            ${state.list.map((item, index) => {
                return `<li>
                    <b>${item.title}</b>
                    <span>${item.content}</span>
                    <span class="del" data-id="${index}">del</span>
                </li>`
            }).join('')}
        </ul>
        <ul>
            ${appHistory.map((item, index) => {
                return `<span style="display: inline-block; padding: .5em; margin: 0 1em; background: red;" data-id="${index}" class="history">${index}</span>`
            }).join('')}
        </ul>
    `
}

// 订阅更新
sub(render)
// 初始化渲染
render(store)
