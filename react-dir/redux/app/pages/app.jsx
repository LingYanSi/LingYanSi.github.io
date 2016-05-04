import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { addTodo, fuck, completeTodo, setVisibilityFilter, VisibilityFilters } from './../action/sth.js';
import AddTodo from './Calculator/addTodo.jsx';
import TodoList from './Calculator/todoList.jsx';
import Footer from './Calculator/Footer.jsx';
// import Footer from './Calculator/Footer';

class App extends Component {
  render() {
    // 通过调用 connect() 注入:
    const { dispatch, visibleTodos, visibilityFilter } = this.props

    return (
      <div>
        <AddTodo
          onAddClick={text =>
            dispatch(addTodo(text))
          }
          onFuck={text => dispatch(fuck(text)) } />
        <TodoList
          todos={this.props.visibleTodos}
          onTodoClick={index =>
            dispatch(completeTodo(index))
          } />
      <Footer
          visibilityFilter={this.props.visibilityFilter}
          onShowAll={()=>
              dispatch(setVisibilityFilter(VisibilityFilters.SHOW_ALL))
          }
          onShowComplete={()=>
                  dispatch(setVisibilityFilter(VisibilityFilters.SHOW_COMPLETED))
              }
          onShowActive={()=>
                  dispatch(setVisibilityFilter(VisibilityFilters.SHOW_ACTIVE))
              }></Footer>
          <div>最近一次被<b>{this.props.fuck}</b>xxoo</div>

      </div>
    )
  }
}

App.propTypes = {
  visibleTodos: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired
  })),
  visibilityFilter: PropTypes.oneOf([
    'SHOW_ALL',
    'SHOW_COMPLETED',
    'SHOW_ACTIVE'
  ]).isRequired
}

function selectTodos(todos, filter) {
  switch (filter) {
  case VisibilityFilters.SHOW_ALL:
    return todos;
  case VisibilityFilters.SHOW_COMPLETED:
    return todos.filter(todo => todo.completed);
  case VisibilityFilters.SHOW_ACTIVE:
    return todos.filter(todo => !todo.completed);
  }
}

// 基于全局 state ，哪些是我们想注入的 props ?
// 注意：使用 https://github.com/faassen/reselect 效果更佳。
function select(state) {
    // state被改变的时候，会执行此函数
    // console.log('会当做props被注入到app组件中', state)
  return {
    visibleTodos: selectTodos(state.todos, state.visibilityFilter),
    visibilityFilter: state.visibilityFilter ,
    fuck: state.fuck
  };
}

// 包装 component ，注入 dispatch 和 state 到其默认的 connect(select)(App) 中；
export default connect(select)(App);
