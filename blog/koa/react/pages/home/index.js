import React,{Component} from 'react'
import { Router, Route, Link, browserHistory } from 'react-router'
import List from 'pages/Article/List'

import Modal from 'module/Modal'
import Tips from 'module/Tips'

import Scroll from 'module/scroll'
import Upload from 'module/Upload'

import './index.scss'

// lastPosition 记录最后浏览位置
const URL = '/home'

class Home extends Component{
    constructor(){
        super()
        this.state = {
            tips: [{
                content: `硬汉 ⇨ 腰`,
                url: `http://www.xiami.com/song/1772580840?spm=a1z1s.7154410.1996860142.3.7qJGVJ`
            }, {
                content: `Crusade ⇨ Pentatonic`,
                url: `http://www.xiami.com/song/1768980046?spm=a1z1s.7154410.1996860142.1.7qJGVJ`
            }],
            upload:[],
            progress: ''
        }

    }
    tipsClose(index){
        let tips = this.state.tips
        tips.splice(index, 1)

        this.setState({
            tips: tips
        })
    }
    componentWillUnmount(){
        // 组建卸载前，移除掉min-height，并移除对scroll事件的监听
        document.body.style.cssText += `;min-height: 0px; `
        Utils.scroll.remove('lastPosition::home')
    }
    lastPosition(){
        // 把当前页面的scrollTop记录下来，存储到sessionStorage中去
        const scrollTop = document.body.scrollTop
        const minHeight = scrollTop + window.innerHeight
        Utils.lastPosition.set(URL, {scrollTop, minHeight })
    }
    componentDidMount(){

        let data = Utils.lastPosition.get(URL, 'object')
        let $body = document.body
        $body.style.cssText += `;min-height: ${data.minHeight}px; `
        $body.scrollTop = data.scrollTop

        // 触发滚动，去加载图片
        Utils.scroll.tick()

        Utils.scroll.listen('lastPosition::home',()=>{
            this.lastPosition()
        })

        // var $ = function(ele){
        //     return document.querySelector(ele)
        // }
        //
        // $('#upload').addEventListener('change', function(event){
        //     // console.log(event);
        //     // 这是文件，
        //     console.log();
        //     let file = event.target.files[0]
        //     let f = new FormData()
        //     f.append('file', file)
        //
        //     Utils.fetch('/upload', {
        //         method: 'post',
        //         body: f,
        //         uploadProgress(percent){
        //             console.log(percent);
        //         }
        //     })
        // })
    }
    uploadDone(res){
        let data = JSON.parse(res);
        let upload =this.state.upload
        upload = upload.concat(data.url.map(item => Utils.getImageCDNSrc(item) ) )

        this.setState({
            upload
        })
    }
    uploadProgress(percent){
        // Modal.open()
        this.setState({
            progress: percent
        })
    }
    uploadStart(){

    }
    render(){
        let state = this.state

        return <div id="home">
            <div>
                {
                    state.tips.map((item, index) => <Tips key={item.url} {...item} close={this.tipsClose.bind(this, index)}></Tips>)
                }
            </div>


            <div>
                {state.upload.map(item => {
                    return <img key={item} src={item} alt="图片加载失败" height='200' width='auto'/>
                })}
                <div>进度条{state.progress}</div>
                <Upload style={{width: 100, height: 100, background: 'rgb(156, 224, 215)'}} onStart={this.uploadStart.bind(this)} onProgress={this.uploadProgress.bind(this)} onEnd={this.uploadDone.bind(this)} multiple={true} accept='image' size='1-22k' zip={true} >
                    <svg width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <polyline points="10, 40, 10, 60, 40, 60, 40, 90, 60, 90, 60, 60, 90, 60, 90, 40, 60, 40, 60, 10, 40, 10, 40, 40, 10, 40 "
                            style={{fill: 'white', stroke: 'red'}} />
                    </svg>
                </Upload>
            </div>

            <Scroll width={140} rowWidth={10} num={10} height={100}>
                {[1,2,3,4,5,6,7,8,9,10].map(item => {
                    return <div className='flex-center' key={item} style={{width: 140, height: 100, 'boxSizing': 'border-box', border: '1px solid red'}}>
                        {item}
                    </div>
                })}
            </Scroll>
            <List len={0}></List>

            <img className='lazy-load-img' src="" data-lazy-img="http://ww4.sinaimg.cn/mw690/699132e6jw1f6mi42zqqtj20gs0b7wfz.jpg" alt=""/>
            <img className='lazy-load-img' src="" data-lazy-img="http://ww4.sinaimg.cn/mw690/699132e6jw1f6mi42zqqtj20gs0b7wfz.jpg" alt=""/>
            <img className='lazy-load-img' src="" data-lazy-img="http://ww4.sinaimg.cn/mw690/699132e6jw1f6mi42zqqtj20gs0b7wfz.jpg" alt=""/>
            <img className='lazy-load-img' src="" data-lazy-img="http://ww4.sinaimg.cn/mw690/699132e6jw1f6mi42zqqtj20gs0b7wfz.jpg" alt=""/>
            <div className='lazy-load-img' src="" data-lazy-bgd="http://ww4.sinaimg.cn/mw690/699132e6jw1f6mi42zqqtj20gs0b7wfz.jpg" style={{height: 300, width: 400 }}></div>
        </div>
    }
}

export default Home
