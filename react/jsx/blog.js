/*-----------------------顶部导航组件-----------------------------*/
var Nav = React.createClass({
	getInitialState:function(){
		var current , _this=this;
		Router.add({
			'/:id':function(parma){
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
		return (<nav>
					<div className="nav">
						<div className="nav-flex">
							<a href="#/index" className={'nav-flex-item '+(this.state.currentItem=='index'?'nfi-current':'')}>首页</a>
							<a href="#/find" className={'nav-flex-item '+(this.state.currentItem=='find'?'nfi-current':'')}>发现</a>
							<a href="#/topic" className={'nav-flex-item '+(this.state.currentItem=='topic'?'nfi-current':'')}>话题</a>
						</div>
					</div>
				</nav>)
	}
});

/*--------------------------侧边栏数据-----------------------------------------*/
var data_sb = {
	index:[{
		url:'/topic/history',
		content:'中国历史'
	},{
		url:'/topic/cultrue',
		content:'英国文学'
	},{
		url:'/topic/film',
		content:'日本电影'
	},{
		url:'/topic/sex',
		content:'法国情色'
	}],
	find:[{
		url:'/topic/history',
		content:'中国历史'
	},{
		url:'/topic/cultrue',
		content:'英国文学'
	},{
		url:'/topic/film',
		content:'日本电影'
	},{
		url:'/topic/sex',
		content:'法国情色'
	}],
	topic:[{
		url:'/topic/history',
		content:'中国历史'
	},{
		url:'/topic/cultrue',
		content:'英国文学'
	},{
		url:'/topic/film',
		content:'日本电影'
	},{
		url:'/topic/sex',
		content:'法国情色'
	}]
};

/*------------------------侧边栏组件--------------------------------------*/
/* sidebar和nav之间有关联 */
/* main和sidebar之间有关联 */
var Sidebar = React.createClass({
	getInitialState : function(){
		var itemType,current , _this=this;
		Router.add({
			'/topic/:id':function(parma){
				current = parma ? parma : '';
				itemType = 'topic' ;
				_this.setState({
					currentItem:current ,
					itemType : itemType
				});
			},
			'/find/:id':function(parma){
				current = parma ? parma : '';
				itemType = 'find' ;
				_this.setState({
					currentItem:current ,
					itemType : itemType
				});
			},
			'/topic/:id':function(parma){
				current = parma ? parma : '';
				itemType = 'topic' ;
				_this.setState({
					currentItem:current ,
					itemType : itemType
				});
			}
		});
		itemType = 'topic' ;
		console.log(itemType)
		return {
			data : data_sb[itemType] ,
			currentItem : current ,
			itemType : itemType
		}
	},
	render : function(){

		var items = this.state.data.map(function(ele){
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

/*--------------------------数据-----------------------------------*/
var data_main = [{
		url:'/topic/history',
		content:[{
			content:'秦国丞相李斯。拜访小圣贤庄。道：“政治家的儿子，也是政治家”',
			comments:[{name:'胡锦涛',content:'不是我要当主席，是大家选我当主席'},{name:'江泽民',content:'特首，也要按照香港的法律啊，你们呀，不要想搞个大新闻，然后再把我批判一番'}]
		},{
			content:'志愿军已经尽了最大的努力了，没有违抗命令一说。 这场战役双方表现都很出色。 志愿军把轻步兵穿插包围的特点发挥到极致，美军也把自己的火力投射优势发挥到了极致。 只说几个画面： 美军把战死袍泽的尸体绑在坦克上亡命突围，突围的先头尖刀部队也是毫无畏惧的冲击志愿军阵地，突围的时候发现整建制的志愿军战士冻死在坚固的阻击阵地。刘伯承也评价，美军败而不乱，不愧是盖世强军。 有个桥梁是美军南归的必经之路，志愿军的穿插部队抢在美军到达之前炸毁了桥梁，就等着主力撵着美军过来围观他们插翅难飞了，可美军居然空投来了桥梁组件，工兵直接架好了新桥。接着新桥又被志愿军炸毁，再接着美军固守，后方从别的地区调来新的桥梁组件又架起一条新桥！ 毕竟是正经的美军王牌，不是所谓的美械国军嘛。 就算是纳粹国防军精锐坦克师或者红军近坦五集就敢拍着胸脯说能全歼大红一师吗？',
			comments:[{name:'五毛',content:'解放军最牛逼'},{name:'美分',content:'牺牲几十万人，就为了一个金家王朝，呵呵'}]
		},{
			content:'惠帝元康九年，太子洗马江统以为戎狄乱华，宜早绝其原，乃作《徙戎论》，其略曰：“四夷之中，戎狄为甚。弱则畏服，强则侵叛。是以有道之君，待之有备，御之有常。期令境内获安，疆场不侵而已。汉建武中，马援领陇西太守，讨叛羌，徙其余种於关中，居冯翊、河东、北地。魏武帝徙武都氐於秦川，以御蜀，盖权宜之计。今已受其敝矣。夫关中，帝王所居，未闻戎狄宜在此土。非我族类，其心必异。候隙乘便，辄为横逆。此必然之势也。宜及今兵威方盛，因其死亡流散，与关中人户为仇雠之际，徙诸羌，著先零、罕开、析支之地；徙诸氐，出还陇右，著阴平、武都之界。并州诸胡，建安中听其散居六郡，今为五部，户至数万。正始中，毌丘俭讨句骊，徙其馀种於荥阳，部户亦以千计，并皆骁勇便利。夫百姓失职，犹或亡叛，犬马肥充，则有噬啮，况於夷狄，能不为变！此等皆宜申谕发遣，还於本域，慰彼土思，惠此中国，於计为长也。”朝廷不能用。',
			comments:[{name:'石勒',content:'汉人都得死'},{name:'冉闵',content:'胡人都得死'}]
		}]
	},{
		url:'/topic/cultrue',
		content:[{
			content:'Ying Kingdom Wen Hua',
			comments:[]
		},{
			content:'罗素的生活',
			comments:[{name:'jiaLyve',content:'地球是圆的'},{name:'NickBit',content:'WTF!!!!!'}]
		}]
	},{
		url:'/topic/film',
		content:[{
			content:'霓虹の电影大作战',
			comments:[{name:'AV久太保',content:'sigaoyi，我想要和你一起哭，我想要和你一起笑，我想和你一起xj，直到死掉'},{name:'野尻太君',content:'哟西'}]
		},{
			content:'秒速五厘米',
			comments:[{name:'穹',content:'人潮人海'}]
		}]
	},{
		url:'/topic/sex',
		content:[{
			content:'MILK YOUR CUNT',
			comments:[{name:'Julia',content:'BITCH,MY LARGE DICK IS JIKENANNAIING'}]
		}]
	},{
		url:'/error',
		content:[{
			content:'此页面不存在',
			comments:[{name:'Julia',content:'垃圾！！！！！！'}]
		}]
	}];

/*---------------------------主内容组建-------------------------------------*/
var Main = React.createClass({

	getInitialState : function(){
		var current , _this=this;
		var urls = data_main.map(function(ele){
			return ele.url
		});
		Router.add({
			'/topic/:id':function(parma){
				parma = parma? '/topic/'+parma :'/';
				current = urls.indexOf(parma) ;
				// console.log(parma,urls,current)
				if(current>-1){
					_this.setState({
						currentItem:current
					});
				}else{
					_this.setState({
						currentItem:urls.length-1
					});
					// location.href = '#/error' ;
				}
			},
			others:function(){
				current =urls.length-1 ;
				// location.href = '#/error' ;
			}
		});

		return {
			data : data_main ,
			comment : false ,
			currentItem : current
		}
	},
	render : function(){
		var items = this.state.data[this.state.currentItem].content.map(function(ele){
			return (<div className="main-item">
						<div>{ele.content}</div>
						<Info ref="info" allList={ele.comments}></Info>
					</div>)
		},this);
		
		return (<div id="main">
					{items}
				</div>)
	}
});
/*-------------------- 错误页面处理 ------------------------------*/
var Error = React.createClass({
	render : function(){
		return (<div>
				<h1>此页面不存在</h1>
			</div>)
	}
})

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

/*---------------------------------- App组件 --------------------------------------------*/
var App = React.createClass({

	render : function(){
		return (<div>
					<Nav></Nav>
					<div className="wrap">
						<Sidebar></Sidebar>
						<Main></Main>
					</div>
				</div>)
	}
});

React.render(
	<App></App>,
	document.getElementById('app')
	);