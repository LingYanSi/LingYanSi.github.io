import React from 'react'
import ReactDom from 'react-dom'
import { Router, Route, Link, browserHistory } from 'react-router'
import Modal from 'module/Modal'

require('./index.scss')

class New extends React.Component{
    constructor(){
        super()
        this.state = {
            title: '',
            content: '',
            tags: []
        }

        this.submit = this.submit.bind(this)
        this.insertImage = this.insertImage.bind(this)
    }
    componentDidMount(){
        let id = this.props.params.id

        // 依次加载需要的文件
        Utils.loadFile('/lib/js/jquery.min.js')
            .then(msg => Utils.loadFile('/lib/js/jquery.hotkeys.js'))
            .then(msg => Utils.loadFile('/lib/js/bootstrap-wysiwyg.js'))
            .then(res => {
                if( id!== undefined ){
                    this.getData(id)
                }else{
                    $('#editor').wysiwyg()
                }
            })
    }
    // 卸载前
    componentWillUnmount(){
        // $('.article-new').remove('.editor-wrap')
        // 移除window上的事件
        $('#editor').remove()
    }
    // 获取文章信息
    getData(id){
        let that = this
        fetch(`/article/${id}`)
            .then(function(response){
                return response.json()
            })
            .then(function(data){
                that.setState(data.result)
                $('#editor').wysiwyg()
            })
    }
    // 提交
    submit(event){
        event.preventDefault()

        let data = this.state

        data.title = this.refs.title.value
        data.content = $('#editor').html()
        data.tags = this.refs.tags.value

        fetch('/article/create',{
            method: 'POST',
            body: JSON.stringify(data),
            credentials: 'same-origin'
        }).then(function(response){
            return response.json()
        })
        .then(function(data){
            if(data.status.code == 1001){
                location.href = '#/'
            }
            Modal.tips(data.result)
        })
    }
    // 返回html
    rawHtml(str=''){
        return {__html: str}
    }
    insertImage(){
        this.refs.insertImage.click()
    }
    render(){
        const state = this.state

        if( !state.id && this.props.params.id != undefined ){
            return null
        }

        return <div className="article-new">
            <div  id="fd">
                <input type="text" name="title" ref="title"
                    placeholder="标题"
                    defaultValue={state.title} /><br/>
                <input type="text" name="tags" ref="tags" placeholder="标签" defaultValue={state.tags } /><br/>

                <div>
                    <div className="btn-toolbar" data-role="editor-toolbar"
                            data-target="#editor">
                         <a data-edit="bold" className="btn">B</a>
                         <a data-edit="underline" className="btn">_</a>
                        <button onClick={this.insertImage}>图片</button>
                         <input type="file" ref="insertImage" data-edit="insertImage" className="hide" />
                    </div>

                    <div id="editor" data-placeholder="fuck u please write sth " dangerouslySetInnerHTML={ this.rawHtml(state.content) } >
                    </div>
                </div>

                <button type="submit" onClick={this.submit}>提交</button>
            </div>
        </div>
    }
}

export default New
