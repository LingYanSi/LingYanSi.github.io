
/*------------------------侧边栏组件--------------------------------------*/
/* sidebar和nav之间有关联 */
/* main和sidebar之间有关联 */

var app = app || {} ;
;(function(){
    app.Sidebar = React.createClass({
        getInitialState : function(){
            var current , _this=this;
            Router.add({
                '/topic/:id':function(parma){
                    current = parma ? parma : '';
                    _this.setState({
                        currentItem:current 
                    });
                },
                '/find/:id':function(parma){
                    current = parma ? parma : '';
                    _this.setState({
                        currentItem:current 
                    });
                },
                '/topic/:id':function(parma){
                    current = parma ? parma : '';
                    _this.setState({
                        currentItem:current 
                    });
                }
            });

            return {
                currentItem : current 
            }
        },
        render : function(){

            var items = this.props.info.map(function(ele){
                // console.log('/'+this.state.currentItem ,ele.url)
                return (<li className={'/topic/'+ this.state.currentItem == ele.url ? 'sidebar-current' : null}>
                            <a href={'#'+ele.url}>{ele.content}</a>
                        </li>)
            },this);

            return (<ol id="sidebar">
                        {items}
                    </ol>)
        }
    });
})();

