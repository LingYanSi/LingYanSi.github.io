
import {combine} from 'redux'
const ACTION_NAME = 'ASYNC_DATA'

import change_user_name from './change_user_name'

// action生成器
function action(value){
    return (dispatch)=>{
        // 异步任务
        let time = Date.now()
        setTimeout(() => {
            dispatch(change_user_name('async的直播'))
            console.log(Date.now() - time)
        }, 1000)
    }

}


// reducer
function reducer(state, action) {
    let {
        type,
        data
    } = action

    switch (type) {
        case ACTION_NAME:
            // 因为assign只是浅copy，因此并不是最佳选择，因此让我们使用不可变数据immutable
            return Object.assign({}, state, {
                num: state.num + data.value
            })
        default:
            return null
    }
}

// 混合生成一个
combine(reducer)

// 导出 action
export default action
