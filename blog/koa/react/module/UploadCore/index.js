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
        let file = files[0]

        let str = ''
        for(let key in file){
            str += key
        }
        console.log(file , file.lastModifiedDate.getTime(), file.size, file.slice(0,100) , Object.keys(file));
        // alert(str)
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


// https://vod.api.qcloud.com/v2/index.php?Action=CreateScreenShot&Region=sh&SecretId=AKIDB4UN43U9gdAK8CJ3EpcQtFHqJqsWmEk7&Nonce=34664&Timestamp=1470970565&RequestClient=SDK_PHP_1.1&Signature=GDMVUVVT4aumkF%2B60jB%2FOAIFcVs%3D
//
// fileName
// fileSha
// fileSize
// dataSize
// offset
// fileType
