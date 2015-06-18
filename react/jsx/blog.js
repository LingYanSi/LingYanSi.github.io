
var Nav = React.createClass({

	render : function(){
		return (<nav>
					<div className="nav">
						<h1>我是导航栏</h1>
					</div>
				</nav>)
	}
});

var data_sb = [{
		url:'/histroy',
		content:'中国历史'
	},{
		url:'/cultrue',
		content:'英国文学'
	},{
		url:'/film',
		content:'日本电影'
	},{
		url:'/sex',
		content:'法国情色'
	}];
var Sidebar = React.createClass({
	getInitialState : function(){
		var current , _this=this;
		Router.add({
			'/:id':function(parma){
				current = parma ;
				_this.setState({
					currentItem:parma
				});
			}
		});
		return {
			data : data_sb ,
			currentItem : current
		}
	},
	render : function(){

		var items = this.state.data.map(function(ele){
			return (<li className={ '/'+this.state.currentItem == ele.url ? 'sidebar-current' : null}>
						<a href={'#'+ele.url}>{ele.content}</a>
					</li>)
		},this);

		return (<div id="sidebar">
					{items}
				</div>)
	}
});

var data_main = [{
		url:'/histroy',
		content:['秦国丞相李斯。拜访小圣贤庄','赵国将军赵括，战死长平']
	},{
		url:'/cultrue',
		content:['Ying Kingdom Wen Hua','罗素的生活']
	},{
		url:'/film',
		content:['霓虹の电影大作战','罗生门']
	},{
		url:'/sex',
		content:['France Porn Cunt','巴黎野玫瑰']
	}];
var Main = React.createClass({

	getInitialState : function(){

		var current , _this=this;
		var urls = data_main.map(function(ele){
			return ele.url
		});
		Router.add({
			'/:id':function(parma){
				parma = '/'+parma ;
				current = urls.indexOf(parma);
				_this.setState({
					currentItem:current
				});
			}
		});

		return {
			data : data_main ,
			comment : true ,
			currentItem : current
		}
	},
	commentToggole : function(){
		this.setState({
			comment : !this.state.comment
		});
	},
	render : function(){
		var items = this.state.data[this.state.currentItem].content.map(function(ele){
			return (<div className="main-item">
						<div>{ele}</div>
						<Info></Info>
					</div>)
		},this);

		return (<div id="main">
					{items}
				</div>)
	}
});
var Info = React.createClass({
	getInitialState : function(){
		return {
			comment : false 
		}
	},
	commentToggole : function(){
		this.setState({
			comment : !this.state.comment
		});
	},
	render : function(){
		return (<div>
					<div className="info">
						<span>分享</span>
						<span>帮助</span>
						<span>举报</span>
						<span onClick={this.commentToggole}>评论</span>
					</div>
					{this.state.comment ? <Comment hidden={this.state.comment}></Comment> : null }
				</div>)
	}
});


/* ----------------------------评论组建------------------------------------------*/
var comments = [{name:'胡锦涛',content:'不是我要党主席，是大家选我当主席'},{name:'江泽民',content:'你们呀，不要想搞个大新闻，让后再把我批判一番'}] ;
var Comment = React.createClass({
	getInitialState : function(){
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
		comments.push({
			name : '女王大人' ,
			content : value
		});
		node.value = '' ;
		this.resetState();
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

var App = React.createClass({

	render : function(){
		return (<div>
					<Nav></Nav>
					<Sidebar></Sidebar>
					<Main></Main>
				</div>)
	}
});

React.render(
	<App></App>,
	document.getElementById('app')
	);