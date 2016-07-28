import {Component} from 'react'
import {render} from 'react-dom'

import App from './app'
import Wrap from 'module/redux'


store = {
    data: '我是数据'
}

class P extends Component {
    render(){
        return <Wrap store={store}>
            <App></App>
        </Wrap>
    }
}

render(<P />, document.querySelector('#app'))
