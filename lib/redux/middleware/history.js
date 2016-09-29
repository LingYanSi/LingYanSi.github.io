
let appHistory = []
let id = 0
let index = 0
window.fuck = appHistory

function clone(obj){
    let state = JSON.parse(JSON.stringify(obj))
    appHistory.push({
        id,
        state
    })
    // index = appHistory.length
    return state
}

let prevStepIsHistory = false

let history = store => next => action => {
    if(!prevStepIsHistory){
        // 上一步不是历史版本，就缓存当前state
        clone( store.getState() )
    } else {
        // 当前action不是上一步 && 上一步是历史版本，那就切割历史
        if (action.type != 'PREV_STEP' ) {
            appHistory.splice(index + 1)
            console.log('切割了', appHistory, index);
        }
    }
    // 缓存当前action是不是PREV_STEP
    prevStepIsHistory = action.type == 'PREV_STEP'
    // 如果是历史action，就缓存版本号
    if(prevStepIsHistory) {
        index = action.data.index !== undefined ? action.data.index : index
    }

    next(action)
}

export default history
export {appHistory}
