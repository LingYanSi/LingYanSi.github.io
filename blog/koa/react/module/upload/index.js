import {Component} from 'react'

class Upload extends Component{
    constructor(){
        super()

        this.handleClick = this.handleClick.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    // 点击事件
    handleClick(){
        let $file = this.refs.file
        $file.click()
    }
    // change事件
    handleChange(event){
        let file = event.target.files[0]
        let f = new FormData()
        f.append('fuck', '习近平')
        f.append('file', file)

        Utils.fetch('/upload', {
            method: 'post',
            body: f,
            uploadProgress:(percent)=>{
                this.props.onProgress && this.props.onProgress(percent)
            }
        }).then(res => {
            this.props.onEnd && this.props.onEnd(res)
        })
    }
    render(){
        // zip是否压缩,压缩使用canvas压缩 accept接收文件类型 mult多图上传
        let {className, style} = this.props
        let props = {className, style}

        return <div {...props} onClick={this.handleClick}>
            <input type="file" ref="file" onChange={this.handleChange} className="hide"/>
            {this.props.children}
        </div>
    }
}

export default Upload
