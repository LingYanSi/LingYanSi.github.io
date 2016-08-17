// 二维码登录

import {Component} from 'react'

class QrLogin extends Component {
    componentDidMount(){
        //
        this.toQR('https://www.baidu.com')
    }
    getQrId(){
        // 想后端请求一个 id
        fetch()
    }
    toQR(text){
        var qrcode = new QRCode(this.refs.qrcode, {
            text,
            width: 128,
            height: 128,
            colorDark : "#000000",
            colorLight : "#ffffff",
            correctLevel : QRCode.CorrectLevel.H
        })
    }
    render(){
        // 渲染一个二维码
        return <div ref="qrcode"></div>
    }
}

export default QrLogin
