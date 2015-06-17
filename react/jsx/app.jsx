window.onload = function(){
	
	/*单条item*/
	var Item = React.createClass({ // react组件名首字母要大些，用意是为了和标准的html标签区分
		getInitialState:function(){
			return {
				name : this.props.data.name ,
				age : this.props.data.age
			}
		},
		handleClick:function(){
			this.setState( {nima: !this.state.nima } );
		},
		edit:function(){
			this.refs.name.getDOMNode().setAttribute('contentEditable',true);
		},
		save:function(event){ // 保存数据
			var node = this.refs.name.getDOMNode();
			var value = {} ;
			if(event.keyCode){
				if( event.keyCode == 27 ){
					node.removeAttribute('contentEditable');
					this.setState({ name:this.props.data.name  }); // 取消编辑，将原来的数据覆盖
					return 
				}else if( event.keyCode != 27 && event.keyCode !=13 ) {
					this.setState({ name: event.target.textContent }); // 数据变化时将数据渲染
					return
				} ;
			}
			value.name = node.textContent ;
			this.props.onEdit(value); // 保存数据
			node.removeAttribute('contentEditable');
		},
		del:function(){ // 其实根据flux，增删改查，不应直接反映在v上，应该先走model，数据改变后，在反映到view上
			this.props.onDel();
		},
		render : function(){
			var nima = this.state.nima ? '周芷若' : '赵敏' ;
			var dis = parseInt(this.state.age) - this.props.hidden >0?'block':'none';
			var itemStyle = { display : dis}
			return (
				<li ref="item" style={itemStyle}> 
					<span className ="name" 
							ref="name" 
							onDoubleClick ={ this.edit } 
							onBlur={ this.save } 
							onChange={ this.change }
							onKeyDown={ this.save } >{this.state.name}</span> 

					<span className ="age" 
							ref="age" 
							onDoubleClick ={ this.edit } 
							onBlur={ this.save } 
							onKeyDown={ this.save } >{this.state.age}</span> 

					<span onClick={ this.handleClick }> </span>
					<span onClick={ this.del }>删除</span>
				</li>
			);
		}
	});

	/*添加新条目*/
	var AddNote = React.createClass({
		handleClick:function(event){
			if( event.keyCode && event.keyCode != 13 ) return 
			if( this.refs.wName.getDOMNode().value && this.refs.wAge.getDOMNode().value ){
				this.props.onAdd({ name:this.refs.wName.getDOMNode().value ,age:this.refs.wAge.getDOMNode().value });
				this.refs.wName.getDOMNode().value = '' ;
				this.refs.wAge.getDOMNode().value = '' ;
			}else{
				alert('信息不完整')
			}
			//  新增一个item
		},
		clearAll : function(){
			// 清空所有
			this.props.onClear();
		},
		render : function(){
			return (<div>
				<input type="text" id="wName" ref="wName" placeholder="名字" onKeyDown={ this.handleClick } /> 
				<input type="number" id="wAge" ref="wAge" placeholder="年龄" onKeyDown={ this.handleClick } /> 
				<button onClick={this.handleClick}>提交</button>
				<button onClick={ this.clearAll }>清空</button>
				</div>);
		}
	});

	/*底部状态*/
	var Footer = React.createClass({
		getInitialState:function(){
			Router.add({
				'/':function(){
					console.log('我是你爹');
				}
			});
			return {}
		},
		render : function(){
			return (<div id="footer">
					<a href="#/" className={this.props.current===0?'current':''}>all</a>
					<a href="#/50" className={this.props.current===50?'current':''}>50岁以上</a>
					<a href="#/100" className={this.props.current===100?'current':''}>100岁以上</a>
				</div>)
		}
	});

	/*数据*/
	var data = [{name:'毛润之',age:'18'},
				{name:'江青',age:'108'},
				{name:'戴笠',age:'58'},
				{name:'宋美龄',age:'68'},
				{name:'地图开疆蒋中正',age:'120'}] ;

	var data1 = [{name:'毛润之',age:'18'},
				{name:'江青',age:'108'},
				{name:'戴笠',age:'58'},
				{name:'宋美龄',age:'68'},
				{name:'地图开疆蒋中正',age:'120'}] ;
	/*数据如果是用ajax获取的，那是不是说要在本地维护一份数据，对本地数据增删改查的同时，也要对服务器数据做出改变*/

	/*主体*/
	var Main = React.createClass({ // 主组件
		resetData : function(){
			this.setState({
				itemCounts : data
			});
		},
		addOne:function(item){
			console.log(item)
			data.push(item)
			if(item){
				this.resetData();
			}
			/*this.props.data = [{name:'冰北库',age:'108'},
				{name:'地图开疆蒋中正',age:'120'}] ;*/
		},
		clearAll : function(){
			data = [] ;
			this.resetData();
		},
		clearOne : function(ele,index){
			delete data[index] ;
			this.resetData();
		},
		edit : function(ele,index,value){
			data[index].name = value.name ? value.name : data[index].name ;
			console.log(data[index].name,value.name)
			// data[index].age = value.age ;
			this.resetData();
		},
		getInitialState : function(){

			var _this = this ;
			var filter = 0 ;
			Router.add({
				others : function(){
					console.log('===>跳转到其他页面')
				},
				'/':function(){
					filter = 0 ;
					_this.setState({filter:0});
					console.log('全部')
				} ,
				'/50':function(){
					filter = 50 ;
					_this.setState({filter:50});
					console.log('大于50')
				},
				'/100':function(){
					filter = 100 ;
					_this.setState({filter:100});
					console.log('大于100')
				},
				'/book/:id/name':function(param){
					console.log('现在====》书单目录'+param);
				} 
			});
			return {
				itemCounts : data ,
				filter : filter
			}
		},
		render : function(){

			var items = this.state.itemCounts.map(function(ele,index){
				// 路由变化，触发filter的变化，就可以更改item的状态
				return <Item data={ele} 
							onDel={this.clearOne.bind(this,ele,index)} 
							onEdit={this.edit.bind(this,ele,index)} 
							hidden={this.state.filter}
							>
						</Item>
			},this)

			var mianStyle = { maxWidth:"900px" , margin:"0 auto" } ;
			var h1Style = { color:"rgb(247,105,105)" , fontSize:"3em" , lineHeight:"2" , textAlign:"center" } ;

			var footer = <Footer current={this.state.filter}></Footer>

			return (<div style={ mianStyle }>
				<h1 style={ h1Style } >React</h1>
				<AddNote onAdd={this.addOne} onClear={this.clearAll} ></AddNote>
				<ol id="ol">{items}</ol>
				{footer}
			</div>);
		}
	});

	React.render(
		<Main data={data} du="heihei"  />,
		document.getElementById('example')
	);

}