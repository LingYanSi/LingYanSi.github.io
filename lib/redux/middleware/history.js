
let appHistory = []
let id = 0

function clone(obj){
    let state = JSON.parse(JSON.stringify(obj))
    appHistory.push({
        id,
        state
    })

    return state
}

let prevStepIsHistory = false

let history = store => next => action => {
    if(!prevStepIsHistory){
        clone( store.getState() )
    }

    prevStepIsHistory = action.type == 'PREV_STEP'
    next(action)
}

export default history
export {appHistory}
