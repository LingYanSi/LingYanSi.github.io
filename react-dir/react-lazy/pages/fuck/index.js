import React,{Component} from 'react'
import Link from 'module/link'
import cache from 'module/cache'

// import {Button} from './../../node_modules/antd/dist/antd.js'
// import {Button, DatePicker} from 'antd'

// import 'antd/dist/antd.css'

import home from 'module/bitch'
import * as Sack from 'module/sack'

console.log(Sack);


class Fuck extends Component{
    componentWillUnmount(){
        console.log('生命周期结束');
    }
    render(){
        return <div>
            1111
            <Link href="/home">去主页</Link>
        </div>
    }
}

cache['/fuck.js'] = Fuck
