
import {combine} from 'redux'
const ACTION_NAME = 'CHANGE_NUM'

// action生成器
function action(value){
    return {
        type: ACTION_NAME,
        data: {
            value
        }
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
