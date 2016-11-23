import React,{Component} from 'react'
import cache from 'module/cache'
import Link from 'module/link'

class Fuck extends Component{
    render(){
        console.log('props.param', this.props.param);
        return <div>
            你好啊{new Date().getSeconds()} 谢谢谢谢谢谢
            <Link href='/home'>生生世世</Link>
        </div>
    }
}

cache['/home.js'] = Fuck
