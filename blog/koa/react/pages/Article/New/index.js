import React from 'react'
import ReactDom from 'react-dom'
import { Router, Route, Link, browserHistory } from 'react-router'

require('./index.scss')

class New extends React.Component{
    constructor(){
        super()
        this.state = {
            title: '',
            content: '',
            tags: ''
        }
    }
    componentDidMount(){
        let id = this.props.params.id
        if( id!== undefined ){
            this.getData(id)
        }

        setTimeout(function(){
            $('#editor').wysiwyg()
        },1000)

        console.log('time2');

    }
    componentWillUnmount(){
        // $('.article-new').remove('.editor-wrap')
        $('#editor').remove()
    }
    getData(id){
        let that = this
        fetch(`database/article/${id}.json`)
            .then(function(response){
                return response.json()
            })
            .then(function(data){
                that.setState(data)
            })
    }
    submit(event){
        event.preventDefault()
        var fd = new FormData(document.querySelector('#fd'))
        fd.set('content', $('#editor').html() )

        var state = this.state
        for (let key in state) {
            if( !fd.has(key) ){
                fd.set(key, state[key])
            }
        }

        fetch('/newArticle',{
            method: 'POST',
            body: fd
        }).then(function(response){
            return response.json()
        })
        .then(function(data){
            console.log(data)
            location.href = '#/'
        })
    }
    rawHtml(str=''){
        return {__html: str}
    }
    render(){
        const state = this.state

        if( !state.id && this.props.params.id != undefined ){
            return null
        }

        console.log('time1');

        return <div className="article-new">
            <form action="/newArticle?name=ssss" method="POST" id="fd">
                <input type="text" name="title"
                    placeholder="标题"
                    defaultValue={state.title} /><br/>
                <input type="text" name="tags" placeholder="标签" defaultValue={state.tags} /><br/>

                <div class="btn-toolbar" data-role="editor-toolbar"
                        data-target="#editor">
                     <a data-edit="bold" className="btn">粗</a>
                     <input type="file" data-edit="insertImage" />
                </div>

                <div id="editor" data-placeholder="fuck u please write sth " dangerouslySetInnerHTML={ this.rawHtml(state.content) } >
                </div>

                <button type="submit" onClick={this.submit.bind(this)}>提交</button>
            </form>
        </div>
    }
}

export default New
