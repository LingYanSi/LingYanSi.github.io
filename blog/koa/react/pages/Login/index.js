import {Component} from 'react'
import Modal from 'module/Modal'

class Login extends Component{
    constructor(){
        super()
        this.login = this.login.bind(this)
    }
    login(){
        let password = this.refs.password.value

        fetch('/login', {
            method: 'POST',
            credentials: 'same-origin',
            body: JSON.stringify({password})
        }).then(res => res.json())
        .then(data => {
            if(data.status.code == 1001){
                // Modal.tips('登陆成功')
                history.back()
            }
        })
    }
    render(){
        return <div style={{paddingTop: '40vh'}}>
            <input type="password" ref="password"/>
            <button onClick={this.login}>登录</button>
        </div>
    }
}

export default Login
