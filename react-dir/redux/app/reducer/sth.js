import {
    combineReducers
} from 'redux';

import immutable from 'immutable'

import {
    ADD_TODO,
    COMPLETE_TODO,
    SET_VISIBILITY_FILTER,
    VisibilityFilters
} from './../action/sth.js';

const {
    SHOW_ALL
} = VisibilityFilters;

function visibilityFilter(state = SHOW_ALL, action) {
    switch (action.type) {
        case SET_VISIBILITY_FILTER:
            return action.filter;
        default:
            return state;
    }

}

function newState(state) {
    // 使用不可变数据，来处理数据变化
    return Immutable.List(state)
}

function todos(state = [], action) {
    switch (action.type) {
        case ADD_TODO:
            var nstate = newState(state)
            return nstate.push({
                text: action.text,
                completed: false
            }).toJS()

        case COMPLETE_TODO:
            var nstate = newState(state)
            var index = action.index
            var oldvalue = nstate.get(index)

            return nstate.set(action.index, {
                text: oldvalue.text,
                completed: !oldvalue.completed
            }).toJS()

        default:
            return state;
    }
}

// 每个reducer应该有一个默认的state
function fuck(state='江泽民', action){
    // 根据不同的action.type返回不同的state
    switch(action.type){
        case 'FUCK':
            return action.text

        default:
            return state
    }
}

// 结合reducers其实就是把多个switch合并成一个switch
// 如果多个reducer中含有相同的case,当然会执行后一个

// combineReducers返回的是state，然后以props形式传入组件
// {visibilityFilter:'', todos:[] }
// 当然不同的reducer表示state不同的属性
// 其实每个reducer负责了不同的状态
const todoApp = combineReducers({
    visibilityFilter,
    todos ,
    fuck
});

export default todoApp;
