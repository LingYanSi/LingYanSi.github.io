
import {combine} from 'redux'
const FETCH_START = 'FETCH_START'

// action生成器
function action(index){
    return {
            type: FETCH_START,
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
        case FETCH_START:
            return Object.assign({}, state, {
                fetch: "数据加载中。。。。"
            })
        default:
            return null
    }
}

// 混合生成一个
combine(reducer)

// 导出 action
export default action
