
import React,{Component} from 'react'
import ReactDOM,{render} from 'react-dom'

const data = [{
        title: '红颜旧',
        summary: '知之不知，望向这什么？'
    },{
        title: '红颜旧',
        summary: '知之不知，望向这什么？'
    },{
        title: '红颜旧',
        summary: '知之不知，望向这什么？'
    },{
        title: '红颜旧',
        summary: '知之不知，望向这什么？'
    },{
        title: '红颜旧',
        summary: '知之不知，望向这什么？'
    }]

const Home = React.createClass({
    render(){
        return <div>
            <h1>主页/Home</h1>
            <div>
                {data.map(item=>{
                    return <div>
                        <h3>{item.title}</h3>
                        <p>{item.summary}</p>
                    </div>
                })}
            </div>
        </div>
    }
})

export default Home
