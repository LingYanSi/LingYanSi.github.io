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
        let files = event.target.files
        // let {onStart, onEnd, onError, onProgre} = this.props
        Utils.upload(files, this.props )
    }
    render(){
        // zip是否压缩,压缩使用canvas压缩 accept接收文件类型 mult多图上传
        let {className, style, accept, multiple} = this.props
        let props = {className, style}

        console.log('is support multiple', multiple);

        return <div {...props} onClick={this.handleClick}>
            <form action="" className="hide" ref="form">
            {
                multiple ? <input type="file" ref="file" name="image" onChange={this.handleChange} accept={this.props.accept} multiple className="hide"/>
                : <input type="file" ref="file" name="image" onChange={this.handleChange} accept={this.props.accept}  className="hide"/>
            }
            </form>
            {this.props.children}
        </div>
    }
}

export default Upload
