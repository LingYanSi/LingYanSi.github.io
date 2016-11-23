import {Component} from 'react'
import cache from 'module/cache'

class About extends Component{

    render(){
        let a = 112222223322

        return <div>
            <h1>详情也</h1>
            {this.props.param.id}
        </div>
    }
}

cache['/about.js'] = About
