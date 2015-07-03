var app = app || {} ;
/*---------------------------------- App组件 --------------------------------------------*/
(function(){
    var Nav = app.Nav ;
    var Sidebar = app.Sidebar ;
    var Error = app.Error ;
    var Main = app.Main ;
    var data_sb = app.Model.data_sb ;
    var data_main = app.Model.data_main ;

    var App = React.createClass({
        getInitialState:function(){
            var _this = this, hei ;
            Router.add({
                '/:id':function(parma){
                    // console.log('Main--->'+param)
                    hei = parma.id ; 
                    if(!data_sb[hei]){
                        location.href = "#/index"
                        return ;
                    } 
                    _this.setState({
                        infoSb:data_sb[hei].sbis
                    });
                },
                '/:id/:item/:bitch':function(parma){
                    console.log('路由测试',parma)
                }
            });
            return {
                infoMain:data_main ,
                infoSb:data_sb[hei].sbis
            }
        },
        render : function(){
            return (<div>
                        <Nav></Nav>
                        <div className="wrap">
                            <Sidebar info={this.state.infoSb}></Sidebar>
                            <Main info={this.state.infoMain}></Main>
                        </div>
                    </div>)
        }
    });

    React.render(
        <App></App>,
        document.getElementById('app')
    );
})();
