
import React,{Component} from 'react'
import ReactDOM,{render} from 'react-dom'
import MyEditor from './edit.jsx'

const Message = React.createClass({
    componentDidMount(){
        // 这个也可以用嘛，哈哈哈
        ReactDOM.render(
          <MyEditor />,
          document.getElementById('container')
        )
    },
    render(){
        const LIST = [
            {time:'2007-9-1',username:'枫叶',content:'很高兴认识你'},
            {time:'2007-11-1',username:'枫叶',content:'血雾迷尘，念去去，千里烟波，暮霭沉沉楚天阔'}
        ]
        return <div>
            <h2>留言板</h2>
            <div>
                {LIST.map((item, index)=>{
                    return <div>
                        <span>{index+1}楼</span>
                        <p>{item.username}</p>
                        <div>
                            {item.content}
                        </div>
                        <span>{item.time}</span>
                    </div>
                })}
            </div>
            <h1>编辑器</h1>
            <div id="container" ></div>
        </div>
    }
})

export default Message
