
import React from 'react'
import ReactDom from 'react-dom'

const App = React.createClass({
    render(){
        return <div>
        <h1>嘿嘿</h1>
        </div>
    }
})

ReactDom.render(<App></App>, document.getElementById('app'))
