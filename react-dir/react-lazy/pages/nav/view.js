import React,{Component} from 'react'
import {render} from 'react-dom'
import router from 'module/router'

const fuck = (path)=>{
    console.log('路由发生变化了=====>', path);
}

class Nav extends Component{
    componentDidMount(){
        router.addChangeListener(fuck)
    }
    add(){
        router.addChangeListener(fuck)
    }
    remove(){
        router.removeChangeListener(fuck)
    }
    render(){
        return <div>
            woshi daohang
            <button onClick={this.remove}>移出对路由的监听</button>
            <button onClick={this.add}>对路由的监听</button>
        </div>
    }
}

render(<Nav></Nav>, document.querySelector('#nav'))
