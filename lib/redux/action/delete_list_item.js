
import {combine} from './../redux'
const DELETE_LIST_ITEM = 'DELETE_LIST_ITEM'

// action生成器
function action(index){
    return {
            type: DELETE_LIST_ITEM,
            data: {
                index
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
        case DELETE_LIST_ITEM:
            // 因为assign只是浅copy，因此并不是最佳选择，因此让我们使用不可变数据immutable
            state.list.splice(data.index, 1)
            return Object.assign({}, state )
        default:
            return null
    }
}

// 混合生成一个
combine(reducer)

// 导出 action
export default action
