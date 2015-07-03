
/*---------------------------主内容组建-------------------------------------*/
var app = app || {} ;
;(function(){
	app.Main = React.createClass({

		getInitialState : function(){
			var current=0 , currentType , _this=this;
			var urls = this.props.info.map(function(ele){
				return ele.url
			});
			Router.add({
				'/:id':function(parma){
					currentType = parma.id ;
					_this.setState({
						currentType:currentType
					});
				},
				'/topic/:id':function(parma){
					parmaId = parma.id ? '/topic/'+parma.id :'/';
					current = urls.indexOf(parmaId) ;
					// console.log(parma,urls,current)
					if(current>-1){
						_this.setState({
							currentItem:current
						});
					}else{
						_this.setState({
							currentItem:urls.length-1
						});
						location.href = '#/error' ;
					}
				},
				others:function(){
					console.log('为什吗啊啊啊啊啊啊啊啊啊'+current)
					current =urls.length-1 ;
					location.href = '#/error' ;
				}
			});
			return {
				comment : false ,
				currentItem : current ,
				currentType : currentType
			}
		},
		render : function(){
			var items ;
			switch(this.state.currentType){ // 设置整个主界面的表现
				case 'topic':
					items = this.props.info[this.state.currentItem].content.map(function(ele){
						return (<div className="main-item">
									<div>{ele.content}</div>
									<Info ref="info" allList={ele.comments}></Info>
								</div>)
					},this);
					break ;

				case 'index':
					items = (<div id="index">
								<h1>我是首页</h1>
								<ul>
									<li>本demo使用了react，和自己写的一个router，完成</li>
									<li>话题页面，可添加评论</li>
								</ul>
							</div> );
					break ;

				case 'find' :
					items = (<div id="find">
								<h1>发现，整个世界</h1>
								暮霭沉沉楚天阔，山雨欲来风满楼
								<br/>安能摧眉折腰事权贵，使我不得开心颜
								<img src="file/img/1.jpg" alt=""/>
								<img src="file/img/2.jpg" alt=""/>
							</div>) ;
					break ;
			}
			
			return (<div id="main">
						{items}
					</div>)
		}
	});

	/*----------------------- 工具组件，用于放评论，分享之类 ----------------------------------*/
	var Info = React.createClass({
		getInitialState : function(){
			var _this = this ;
			Router.add({
				others:function(){
					_this.setState({
						hidden:false
					})
				}
			});
			return {
				hidden : false 
			}
		},
		commentToggole : function(){
			// console.log('你也爷爷呢')
			this.setState({
				hidden : !this.state.hidden 
			});
				// alert(this.props.allList[0].name)
		},
		render : function(){
			return (<div>
						<div className="info">
							<span>分享</span>
							<span>帮助</span>
							<span>举报</span>
							<span>感谢</span>
							<span onClick={this.commentToggole}>添加评论</span>
						</div>
						{this.state.hidden ? <Comment allList={this.props.allList}></Comment> : null }
					</div>)
		}
	});


	/* ----------------------------评论组建------------------------------------------*/
	// 评论的状态切换，也就是隐藏，应该是Info组件来控制，但切换页面后，评论组建的状态，怎么弄
	var Comment = React.createClass({
		getInitialState : function(){
			var comments = this.props.allList ? this.props.allList :[] ;
			console.log('重新加载了')
			return {
				data : comments 
			}
		},
		resetState : function(){
			this.setState({
				data : comments
			});
		},
		submit : function(){
			var node = this.refs.input.getDOMNode() ;
			var value = node.value ;
			if(!value) return
			var comments = this.state.data ;
			comments.push({
				name : '女王大人' ,
				content : value
			});
			this.setState({
				data : comments
			});
			// console.log(this.state.data)
			node.value = '' ;
		},
		render : function(){

			var CLItems = this.state.data.map(function(ele){
				return <CLItem clitems={ele}></CLItem>
			},this);

			return (<div className="comment">
						<div className="comment-list">
							{CLItems}
						</div>
						<div className="comment-write">
							<input ref="input" type="text" placeholder="输入评论"/>
							<input type="button" value="提交" onClick={this.submit}/>
						</div>
					</div>)
		}
	});

	/*------------------------------ 单条评论组件 -------------------------------------------*/
	var CLItem = React.createClass({
		getInitialState : function(){
			return {
				name : this.props.clitems.name ,
				content : this.props.clitems.content 
			}
		},
		render : function(){
			return <li>
						<span>{ this.state.name }</span>
						<p>{ this.state.content }</p>
					</li>
		}
	});
})();

