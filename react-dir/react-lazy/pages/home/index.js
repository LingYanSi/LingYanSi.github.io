import React,{Component} from 'react'
import cache from 'module/cache'

class Fuck extends Component{
    render(){
        console.log('props.param', this.props.param);
        return <div>
            你好啊
        </div>
    }
}

cache['/home.js'] = Fuck
