
'use strict' ;

import React from 'react' ;

var List = React.createClass({
    render(){
        return <div>
            {this.props.children}
        </div>
    }
});

export default List ;
