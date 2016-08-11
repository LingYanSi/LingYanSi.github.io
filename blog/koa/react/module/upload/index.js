import {Component} from 'react'
import UploadCore from 'module/UploadCore'

class Upload extends Component {
    constructor(){
        super()

        this.state = {
            upload:[],
            progress: ''
        }
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

        return <div>
            {state.upload.map(item => {
                return <img key={item} src={item} alt="图片加载失败" height='200' width='auto'/>
            })}
            <div>进度条{state.progress}</div>
            <UploadCore style={{width: 100, height: 100, background: 'rgb(156, 224, 215)'}} onStart={this.uploadStart.bind(this)} onProgress={this.uploadProgress.bind(this)} onEnd={this.uploadDone.bind(this)} multiple={true} accept='image' size='1-22k' zip={true} >
                <svg width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <polyline points="10, 40, 10, 60, 40, 60, 40, 90, 60, 90, 60, 60, 90, 60, 90, 40, 60, 40, 60, 10, 40, 10, 40, 40, 10, 40 "
                        style={{fill: 'white', stroke: 'red'}} />
                </svg>
            </UploadCore>
        </div>
    }
}

export default Upload
