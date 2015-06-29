/*-----------------------顶部导航组件-----------------------------*/
var app = app || {} ;
;(function(){
    var data_sb = app.Model.data_sb ;
    app.Nav = React.createClass({
        getInitialState:function(){
            var current , _this=this;
            Router.add({
                '/:id':function(parma){
                    current = parma.id ? parma.id : '';
                    // console.log(current)
                    document.title = data_sb[current].title ;
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
            return (<nav>
                        <div className="nav">
                            <div className="nav-flex">
                                <a href="#/index" className={'nav-flex-item '+(this.state.currentItem=='index'?'nfi-current':'')}>首页</a>
                                <a href="#/find" className={'nav-flex-item '+(this.state.currentItem=='find'?'nfi-current':'')}>发现</a>
                                <a href="#/topic/history" className={'nav-flex-item '+(this.state.currentItem=='topic'?'nfi-current':'')}>话题</a>
                            </div>
                        </div>
                    </nav>)
        }
    });
})();
