import React,{Component} from 'react'

import './index.scss'

class Header extends Component{
    render(){
        var props = this.props

        return <div id="header" className={props.sidebar ? '' : 'sidebar-hide'}>
                    <button className={props.sidebar ? 'show' : ''}
                            onClick={props.handleSidebarChange}>三</button>
            灵岩寺
        </div>
    }
}

export default Header
