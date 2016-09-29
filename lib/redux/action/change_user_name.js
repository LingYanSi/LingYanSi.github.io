
import {combine} from 'redux'
const CHANGE_USER_NAME = 'CHANGE_USER_NAME'

// action生成器
function action(name){
    return {
        type: CHANGE_USER_NAME,
        data: {
            name
        }
    }
}


// reducer
function reducer(state, action) {
    let {
        type,
        data
    } = action

    let user = state.user
    user = Object.assign({},user, {
        name: data.name
    })

    switch (type) {
        case CHANGE_USER_NAME:
            // 因为assign只是浅copy，因此并不是最佳选择，因此让我们使用不可变数据immutable
            return Object.assign({}, state, {
                user ,
                fetch: "数据加载结束"
            })
        default:
            return null
    }
}

// 混合生成一个
combine(reducer)

// 导出 action
export default action
