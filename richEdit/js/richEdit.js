	  // 富文本编辑器
	  // 首先要做的是，对html标签的过滤与重置，那些事会出现的，哪些是要移除掉的
	  // script是必须要移除掉的 html标签中的style属性是要移除的
	  // 然后编辑器的内容是不是 innerHTML

	  var userAgent =(function(){
				var user = {};
				var nav = navigator.userAgent.toLowerCase();
				user.webkit = !!nav.match(/webkit/g);
				user.moz = !!nav.match(/firefox/g);
				user.phone = !!nav.match(/phone|android|pad/g);
				user.ie = !!nav.match(/trident/g);
				return user ;
		})();
		console.log(userAgent)
		var edit = document.getElementById('edit');
		edit.addEventListener('dblclick',function(){
			var str = this.innerHTML ;
			var htmlTag = /^<[\w]+>$/g ;
			str = str.replace(/(<[^>]+>)/g,'');  // 匹配所有html标签 、然后定义一些固定的标签，以为所用
			this.innerHTML = str ;
			console.log(str)

		});
		edit.addEventListener('paste',function(event){ // 获取range，添加标签
			// 移除空文本节点
			removeNullTextNode(this);

			var parentChild = [].slice.call(this.childNodes) ;
			var selection = window.getSelection()
			var range = selection.getRangeAt(0);
			var endContainer = range.endContainer ,
				endOffset = range.endOffset ,
				startOffset = range.startOffset ,
				startContainer = range.startContainer ;

			var fg = document.createDocumentFragment();
			var div = document.createElement('div') ;
			fg.appendChild(div);
			div = fg.querySelector('div');
			div.textContent = event.clipboardData.getData('text/plain') ;
			var children = div.childNodes[0] ;
			range.deleteContents();

			if(!children) return
			range.insertNode(children);

			selection.addRange(range); // 有个奇怪的地方，假如我没有选中任何文本，selection.rangeCount的值为1，但这个时候使用range.insertNode并不会将新加的节点加入到range中，
										// 重新再添加一个range后，似乎是覆盖了原有的range
			selection.collapseToEnd();

			// 移除空文本节点
			removeNullTextNode(this);

			event.preventDefault();

		});
		function removeNullTextNode(that){// 移除空文本节点
			var child = that.childNodes ;
			[].slice.call(child).forEach(function(ele){
				if (/^\s*$/.test(ele.nodeValue))
				{
					ele.parentNode.removeChild(ele)
				}
			})
		}

		edit.addEventListener('mouseup',function(event){ // 很不完美
			if(document.getElementById('preview').value == '编辑') return ;//如果是预览状态，点击无效
			testHighL();
		});
		edit.addEventListener('mousedown',function(event){
			//testHighL()
		})
		function testHighLight(event){ // 需要在提交的时候，对整个做一处理，文本样式的修饰是通过标签实现的，而非属性
			var type = ['b','i','u','font','em','strong'].join(',').toUpperCase();
			var obj = {B:'bold',U:'underline',I:'italic',FONT:'forecolor',EM:'italic',STRONG:'bold'} ;
				var child = event.target ;
				var match ,arr=[];
				if(!!!child) return ;
				while (child.id != 'edit') // 看当前处在哪些标签内部
				{
					match = type.match(child.nodeName) ;
					if(!!match) arr.push(match[0])
					child = child.parentNode ;
				}
				navItem.forEach(function(ele){ // 添加编辑状态
					var that = ele ;
					var have = false ;
					arr.forEach(function(ele){
						if(obj[ele]=== that.id || obj[ele]== that.style.fontWeight || obj[ele]== that.style.fontStyle || obj[ele]== that.color || obj[ele]== that.style.textDecoration ) 
							have = true ;
					})
					if (have)
					{
						ele.classList.add('current')
					}else ele.classList.remove('current')
				});
		}
		function testHighL(){ // 需要在提交的时候，对整个做一处理，文本样式的修饰是通过标签实现的，而非属性
			var type = ['b','i','u','font','em','strong'].join(',').toUpperCase();
			var obj = {B:'bold',U:'underline',I:'italic',FONT:'forecolor',EM:'italic',STRONG:'bold'} ;
			var selection = window.getSelection();
			if(selection.rangeCount){
				var range = selection.getRangeAt(0);
				var child = range.endContainer ;
				var match ,arr=[];
				if(!!!child) return ;
				while (child.id != 'edit') // 看当前处在哪些标签内部
				{
					match = type.match(child.nodeName) ;
					if(!!match) arr.push(match[0])
					child = child.parentNode ;
				}
				navItem.forEach(function(ele){ // 添加编辑状态
					var that = ele ;
					var have = false ;
					arr.forEach(function(ele){
						if(obj[ele]=== that.id || obj[ele]== that.style.fontWeight || obj[ele]== that.style.fontStyle || obj[ele]== that.color || obj[ele]== that.style.textDecoration ) 
							have = true ;
					})
					if (have)
					{
						ele.classList.add('current')
					}else ele.classList.remove('current')
				});
			}
		}
		document.getElementById('preview').addEventListener('click',function(){
			if(edit.contentEditable == 'true'){
				edit.setAttribute('contentEditable','false');
				this.value = '编辑';
				navItem.forEach(function(ele){ ele.classList.remove('current') })
			}else{
				this.value = '预览';
				edit.setAttribute('contentEditable','true');
				edit.focus();
				testHighL();
			}
			edit.classList.toggle('edit-preview');
		});
		var navItem = [].slice.call(document.querySelectorAll('.execcommand'));
		var obj = {bold:['bold','strong'],underline:'underline',italic:['italic','em']} ;
		navItem.forEach(function(ele){
			ele.addEventListener('click',function(event){
				if(document.getElementById('preview').value == '编辑') return ;//如果是预览状态，点击无效
				if (this.id == 'forecolor')
				{
					document.execCommand(this.id,false,'red')
				}else if (this.id == 'createLink')
				{
					var name =	prompt('输入网址','');
					if(!name) return 
					document.execCommand(this.id,false,name);
					[].slice.call(edit.querySelectorAll('a')).forEach(function(ele){ //设置连接在新页面打开
						ele.target = '_blank'
					});
				}else if (this.id == 'insertImage')
				{
					var name =	prompt('输入图片网址','');
					if (/^http:\/\/.+$/.test(name))
					{
						document.execCommand(this.id,false,name);
					}else  return
				}else if (this.id == 'insertVideo')
				{
					var name =	prompt('输入视频网址','');
					if (/^http:\/\/.+$/.test(name))
					{
						document.execCommand(this.id,false,name);//这个地方插视频
					}else  return
				}else{
					document.execCommand(this.id)
				}
				currentToggole(event.currentTarget,'current')
				modelToggel(event.currentTarget)
				
				
				edit.focus();
			});
		})
		function currentToggole(that,classname){
			if (!!!edit.textContent) return
			if(that.classList.contains(classname)) that.classList.remove(classname);
			else that.classList.add(classname);
		}
		// 实现的功能
		// 1，点击切换模式，就是说，点击哪个使用哪个
		function modelToggel(that){
				var selection = window.getSelection();
				if(selection.rangeCount)
				{
					if(!selection.toString() && selection.focusNode != edit)
					{
						var range = selection.getRangeAt(0);
						var child = range.endContainer ;
						var parent ;
						for (var i=0,len=edit.childNodes.length ; i<len ; i++)
						{
							if (child.parentNode.nodeName == 'FONT' || (child.parentNode.id && child.parentNode.id == 'edit') )
							{
								parent = child.parentNode ;
								break ;
							}else child = child.parentNode ;
						}
						if(child.parentNode.id && child.parentNode.id =='edit') return 
						if(that.id!="forecolor") return
						var text = document.createTextNode('·');
						var grand = parent.parentNode ;
						grand.insertBefore(text,parent.nextSibling);

						var range = document.createRange();
						range.selectNode(parent.nextSibling);

						selection.removeAllRanges();
						selection.addRange(range);
					}
					selection.collapseToEnd();
					testHighL();
				}
		}