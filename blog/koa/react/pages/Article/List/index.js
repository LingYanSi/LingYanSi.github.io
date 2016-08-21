import React,{Component} from 'react'
import { Router, Route, Link, browserHistory } from 'react-router'

import Swipe from 'module/swipe'

require('./index.scss')

class List extends Component{
    constructor(){
        super()
        // console.log(this)
        this.state = {
            list: []
        }
    }
    getList(){

        Utils.fetch('/article/list', {
            asynRequest: this.getList,
            context: this
        })
        .then(response => response.json() )
        .then( data =>{
            console.log('数据', data);
            !this.UNMOUNT && this.setState({
                list: data.result.list
            })
        })
    }
    deleteSwipe(id){
        let list = this.state.list.filter(item => item.id != id)
        this.setState({list})
    }
    componentDidMount(){
        this.getList()
    }
    componentWillUnmount(){
        // 销毁所有异步任务
        this.UNMOUNT = true
    }
    rawHtml(str=''){
        str = str.replace(/\s/, '')
        str = str.replace(/<[^>]+>/g, '')
        return {
            __html: str
        }
    }
    render(){

        const len = this.props.len
        var list = len ? this.state.list.slice(0,len) : this.state.list

        return <div className="article-list">
            <ul>
                {list.map((item, index) => {

                    const width = 2 / 10 + 1

                    return <li key={item.id}>
                    <Swipe width={width}>
                        <div className="text">
                            <div className="fuck" style={{width: 1/width * 100 + '%'}}>
                                <Link to={`/article/${item.id}`} className='item'>
                                    <h3>{item.title}</h3>
                                    <div className="summary" dangerouslySetInnerHTML={this.rawHtml(item.content)}></div>
                                    <p className="bott">
                                        <span className="time">{Utils.time.toString(item.create_time)}</span>
                                    </p>
                                </Link>
                            </div>
                            <div className="side" onClick={this.deleteSwipe.bind(this, item.id)}>
                                Delete
                            </div>
                        </div>
                    </Swipe>
                    </li>
                })}
            </ul>
        </div>
    }
}

// 用于检测类型，类型检测只能是class的静态方法
// List.propTypes = {
//     len: React.PropTypes.number.isRequired,
// }

export default List
