
'use strict' ;

import React from 'react' ;

var Field = React.createClass({
    statics:{
        self: null,
        forms:{},
        addField( key, value){
            Field.forms[key] = value ;
        },
        getData(){
            var obj = {};
            Object.keys( Field.forms).forEach((ele)=>{
                obj[ele] = Field.forms[ele].getData();
            });
            return obj ;
        }
    },
    getInitialState(){
        return {
            name: null
        }
    },
    componentDidMount(){
        Field.self = this ;
        Field.addField( this.props.name, this)
    },
    handleChange(event){
        var type = this.props.type ;
        switch( type){
            case 'checkbox':
                this.setState({
                    value: event.target.checked
                });
                break ;
            default:
                this.setState({
                    value: event.target.value
                })
        }
    },
    getData(){
        return this.state.value
    },
    list(type){
        var dom ;
        switch(type){
            case 'text':
                dom = <input type="text" defaultvalue={this.state.value} onChange={this.handleChange} placeholder={this.props.placeholder}/> ;
                break ;
            case 'checkbox':
                dom = <input type="checkbox" defaultvalue={this.state.value} onChange={this.handleChange}/> ;
                break ;
            case 'select':
                var arr = this.props.options.map((ele, index)=>{
                        return <option value={ele} key={index}>{ele}</option>
                    })
                arr.unshift(<option value="">选择</option>)
                dom = <select name="" id="" onChange={this.handleChange} defaultValue={this.state.value}>
                    { arr }
                </select> ;
                break;
            default :
                dom = <div></div>
        }
        return dom ;
    },
    render(){
        return  this.list(this.props.type) ;
    }
});

export default Field ;
