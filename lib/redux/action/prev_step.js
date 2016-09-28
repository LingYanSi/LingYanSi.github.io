
import {combine} from './../redux'

// 上一步
const ACTION_NAME = 'PREV_STEP'

// action生成器
function action(PREV_STATE){
    return {
            type: ACTION_NAME,
            data: {
                PREV_STATE
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
            return Object.assign({}, data.PREV_STATE)
        default:
            return null
    }
}

// 混合生成一个
combine(reducer)

// 导出 action
export default action
export {ACTION_NAME}
