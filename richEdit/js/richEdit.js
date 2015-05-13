	  // 富文本编辑器
	  // 首先要做的是，对html标签的过滤与重置，那些事会出现的，哪些是要移除掉的
	  // script是必须要移除掉的 html标签中的style属性是要移除的
	  // 然后编辑器的内容是不是 innerHTML
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
		document.getElementById('preview').addEventListener('click',function(){
			edit.setAttribute('contentEditable','false');
			edit.classList.toggle('edit-preview')
		});
		[].slice.call(document.querySelectorAll('.execcommand')).forEach(function(ele){
			ele.addEventListener('click',function(event){
				if (this.id == 'forecolor')
				{
					document.execCommand(this.id,false,'red')
				}else if (this.id == 'createLink')
				{
					var name =	prompt('输入网址','');
					document.execCommand(this.id,false,name);
					[].slice.call(edit.querySelectorAll('a')).forEach(function(ele){ //设置连接在新页面打开
						ele.target = '_blank'
					});
				}else if (this.id == 'insertImage')
				{
					var name =	prompt('输入图片网址','');
					if (/^http:\/\/.+$/.test(name))
					{
						console.log('网址有效')
						document.execCommand(this.id,false,name);
					}else {
						console.log('网址无效')
						return
					}
				}else{
					document.execCommand(this.id)
				}
				currentToggole(event.currentTarget,'current')
				modelToggel(event.currentTarget)
				
				
				//edit.focus();
			});
		})
		function currentToggole(that,classname){
			[].slice.call(that.parentNode.children ).forEach(function(ele){
				if (ele != that)
				{
					ele.classList.remove(classname)
				}else{
					ele.classList.add(classname)
				}
				edit.focus();
			})
		}
		// 实现的功能
		// 1，点击切换模式，就是说，点击哪个使用哪个
		function modelToggel(that){
				var selection = window.getSelection();
				if(selection.rangeCount)
				{
					if(true && !selection.toString() && selection.focusNode != edit)
					{
						var range = selection.getRangeAt(0);
						var child = range.endContainer ;
						var parent ;
						for (var i=0,len=edit.childNodes.length ; i<len ; i++)
						{
							if (child.parentNode.nodeName == 'FONT' || (child.parentNode.id && child.parentNode.id == 'edit') )
							{
								parent = child.parentNode ;
								console.log(111111111)
								break ;
							}else child = child.parentNode ;
						}
						if(child.parentNode.id && child.parentNode.id =='edit') return 
						var text = document.createTextNode('1');
						//console.log(parent.nodeName)
						var grand = parent.parentNode ;
						grand.insertBefore(text,parent.nextSibling);

						var range = document.createRange();
						range.selectNode(parent.nextSibling);

						selection.removeAllRanges();
						selection.addRange(range)
					}
					selection.collapseToEnd();
				}
		}