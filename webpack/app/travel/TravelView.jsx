
import React from 'react' ;
import ReactDom from 'react-dom' ;
import Field from './module/File.jsx'
import List from './module/List.jsx'

var Travel = React.createClass({
    submit(){
        console.log( Field.getData());
    },
    render(){
       return <div>
            <Field name="nima" type="text" placeholder={'草草啥打法是否'}/>
            <Field name="nidie" type="checkbox" />
            <List>
                <Field name="ri" type="select" options={['什么鬼啊','卧槽尼玛','嘿嘿嘿']} />
            </List>
            <button onClick={ this.submit}>submit</button>
        </div>
    }
});

ReactDom.render(
    <Travel />,
    document.getElementById('bitch')
);
