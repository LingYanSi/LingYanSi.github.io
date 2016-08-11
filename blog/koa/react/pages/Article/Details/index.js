import React,{Component} from 'react'
import { Router, Route, Link, browserHistory } from 'react-router'
import Modal from 'module/Modal'

import './index.scss'

// 特殊文章id
const ID = '1465987421552'

class Details extends Component{
    constructor(){
        super()
        this.state = {
            title: '',
            content: '',
            time: '',
            tags: [],
            id: 0
        }
    }
    getData(){
        const url = `./database/article/${this.props.params.id}.json`

        fetch(url)
            .then( function(response){
                return response.json()
            })
            .then( (data) => {
                data.content = this.imgTagReplace(data.content)
                this.setState(data)
                Utils.scroll.tick()
            })
    }
    imgTagReplace(str){
        // <img src=\"/img
        str = str.replace(/<img(\s)+src=/gi, `<img class="lazy-load-img" data-lazy-img=`)
        // console.log(str);
        return str
    }
    componentDidMount(){
        this.getData()
        this.showLoveDays()
    }
    del(){
        let id = this.state.id
        if (ID == id) {
            Modal.tips('文章不可删除')
            return
        }

        Modal.alert('确认删除？', ()=>{
            fetch(`/article/del`,{
                method: 'POST',
                body: JSON.stringify({id}),
                credentials: 'same-origin'
            })
                .then(function(response){
                    return response.json()
                })
                .then(function(data){
                    console.log('删除成功')
                    location.href = '#/'
                })
        })

    }
    rawHtml(str){
        return {__html: str}
    }
    // 线上删除/编辑按钮不显示
    getToolBar(){
        const HOSTNAME = 'lingyansi.github.io'
        if (HOSTNAME != location.hostname) {
            return <div className="details-tool">
                <button onClick={this.del.bind(this)}>DEL</button>
                <Link to={`/article/edit/${this.state.id}`}>
                    <button>编辑</button>
                </Link>
            </div>
        }

        return null
    }
    showLoveDays(){

        if (ID == this.props.params.id) {
            let days =Math.ceil( (new Date() - new Date('2016-03-28')) / (1000 * 60 * 60 * 24) )
            Modal.tips(`距离2016-03-28武汉之行，过去了${days}天`, 5000)
        }
    }
    render(){
        const state = this.state

        document.body.scrollTop = 0

        return <div id="article-details">
            <h1>{state.title}</h1>
            <div className="tags-wrap">
                标签：{ state.tags.map(item=>{
                    return <a href="javascript:0;" className="tag tag-pink cursor" key={item} title={item}>{item}</a>
                }) }
            </div>
            { this.getToolBar() }
            <div className="details-content" dangerouslySetInnerHTML={this.rawHtml(state.content)}></div>
            <div className="details-time">时间：{Utils.time.toString(state.time)}</div>
        </div>
    }
}

export default Details
