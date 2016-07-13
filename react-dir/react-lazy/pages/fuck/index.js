import React,{Component} from 'react'
import {render} from 'react-dom'

// import {Button} from './../../node_modules/antd/dist/antd.js'
import {Button, DatePicker} from 'antd'

import 'antd/dist/antd.css'

import lys from 'lys'

lys.fuck()

class Fuck extends Component{
    
    render(){
        return <div>
            1111
            <DatePicker />
            <Button>Button</Button>
        </div>
    }
}

render(<Fuck />, document.querySelector('#app'))
