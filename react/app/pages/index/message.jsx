
import React,{Component} from 'react'
import ReactDOM,{render} from 'react-dom'

const Message = React.createClass({
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
        </div>
    }
})

export default Message
