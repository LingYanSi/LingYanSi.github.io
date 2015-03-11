

function getCookie(c_name)//获取cookie
{
	if (document.cookie.length>0)
	{
		c_start=document.cookie.indexOf(c_name + "=");//获取'c_name='在cookie中第一次出现的位置
		if (c_start!=-1)
		{ 
			c_start=c_start + c_name.length+1 ;//用来获取字符串

			c_end=document.cookie.indexOf(";",c_start);
			if (c_end==-1) //若果没有发现分号‘;’
			{
				c_end=document.cookie.length;//就把cookie的长度付给c_end
			}
			return decodeURIComponent(document.cookie.substring(c_start,c_end));//最后将截取的cookie字符串中的一段解码返回
		} 
	}
	else{return ""}
}

function setCookie(c_name,name_value,c_pass,pass_value,expiredays)//设置cookie，expiredays为cookie的有效期，c_name,value类似json对象
{
			var exdate=new Date();
			exdate.setDate(exdate.getDate()+expiredays);//设置时间
			//document.cookie=c_name+ "=" +decodeURI(name_value)+';'+c_pass+'='+decodeURI(pass_value)+((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
			document.cookie = c_name+ "=" +decodeURI(name_value) + ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())+";path=/";
			document.cookie = c_pass+'='+ decodeURI(pass_value) + ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())+";path=/";
									//需要注意的是，单个cookie只能存储一个有效的------名/值对【username=bitch】外加一个cookie有效期【username=bitch;expires=11.0.2154614545】
									//decodeURI用以编码value，(expiredays==null) ? "" : ";expires="+exdate.toGMTString()
									//后面这句话的意思是：如果没有设置cookie，就不执行什么，如果不为空，就设置expires的日期
}

function checkCookie()//核对cookie与服务器用户名密码是否相同，相同则加载一些东西，不同则重新输入
{
			//setCookie('username','xiaofan','password','xiaofan',30);
	var user_val = getCookie('username');
	var pass_val = getCookie('password');
	
	$.ajax({
		async: false, 
		url: "../../login.php", 
		type: "post", 
		dataType: 'json',
		jsonp: 'jsoncallback', 
		data: {username : user_val ,
				password : pass_val
		}, 
		//contentType: "application/json;utf-8", 
		success:function (data, textStatus){
			if(data.user=='通过')
			{
				$('#nav_login').remove();
				$.ajax({
						async: false, 
						url: "../../get-new-news.php", 
						type: "post", 
						dataType: 'json',
						jsonp: 'jsoncallback', 
						data: null, 
						//contentType: "application/json;utf-8", 
						success:function (data, textStatus){
							var new_news = data;//接收返还的新消息
							if (new_news==1){}//表示没有新消息
							else
							{
								new_news_len = new_news.length;//新消息的长度
								$('.nav_center_nwes a').text('消息'+new_news_len);//在消息模块显示消息个数
							}
						}, 
						error: function (jqXHR, textStatus, errorThrown) { 
									
							} 
				});
				setInterval(function(){
					$.ajax({
						async: true, 
						url: "../../get-new-news.php", 
						type: "post", 
						dataType: 'json',
						jsonp: 'jsoncallback', 
						data: null, 
						//contentType: "application/json;utf-8", 
						success:function (data, textStatus){
							var new_news = data;
							if (new_news==1){$('.nav_center_nwes a').text('消息');}
							else
							{
								new_news_len = new_news.length;
								$('.nav_center_nwes a').text('消息'+new_news_len);
							}
						}, 
						error: function (jqXHR, textStatus, errorThrown) { 
									
							} 
					});
				},5000);
			}
			else{
				login_fail = true;
				$('#nav_center,#nav_new_note,.cpi_delate,#delate_paper').remove();
			}
		}, 
		error: function (jqXHR, textStatus, errorThrown) { 
					alert('无法登陆'); 
			} 
	});
}
var login_fail = false;//初始化登录失败
var new_news_len;//定义新消息的长度
checkCookie();
$('.nav_center_quit').click(function(){
	setCookie('username','11','password','11',-10000);//删除cookie
	location.reload() ;
});



		 $.ajax({ //加载标题
                async: true, 
                url: "title.php", 
                type: "get", 
                dataType: 'json',
                
                jsonp: 'jsoncallback', 
                
                  data: null, 
                  contentType: "application/json;utf-8", 
                success:function (data, textStatus){
					document.title = '西厢，'+data.title;//用以修改html的title
					$('#paper_title').text(data.title);
					$('#paper_content').append(data.content);
					//$('#paper_content').append('<img src="img/logo.jpg">');
					$('.time').text(data.time);
				}, 
                error: function (jqXHR, textStatus, errorThrown) { 
                    alert('第一错误'); 
                } 
          });
		  $.ajax({ //统计访问
				async: true, 
				url: "vistor.php", 
				type: "get", 
				dataType: 'json',
				jsonp: 'jsoncallback', 
				 data: null, 
				contentType: "application/json;utf-8", 
				success:function (data, textStatus){
						$('#reader').text('阅读次数:'+data)
						}, 
				error: function (jqXHR, textStatus, errorThrown) { 
							alert('统计失败'); 
						} 
		 });
		 var comments_floor = 0;
		 if (login_fail)//如果登录失败，则不加载删除元素
		 {
			 $.ajax({ //加载评论
					async: true, 
					url: "get_comments.php", 
					type: "get", 
					dataType: 'json',
					jsonp: 'jsoncallback', 
					 data: null, 
					contentType: "application/json;utf-8", 
					success:function (data, textStatus){
								var comments = data //将php回调的json对象付给js
								if (comments==1)
								{
								}
								else
								{
									for (i=0;i<comments.length ;i++ ,comments_floor++)//遍历json对象，comments.length获取js对象个数
									{
										$('.comments_present').append('<div class="com_pre_item" id="com_pre_item'+comments_floor+'"><div class="cpi_head_img"><img src="../../img/head.jpg" alt=""/></div><div class="cpi_box"><div class="cpi_writer"></div><div class="cpi_content"></div><div class="cpi_bar"><div class="cpi_time"></div><div class="cpi_floor"></div><div class="cpi_reply">回复</div></div></div></div>');
										 $('#com_pre_item'+comments_floor).find('.cpi_writer').text(comments[i].writer);
										 $('#com_pre_item'+comments_floor).find('.cpi_content').text(comments[i].content);
										 $('#com_pre_item'+comments_floor).find('.cpi_time').text(comments[i].time);
										 $('#com_pre_item'+comments_floor).find('.cpi_floor').text((comments_floor+1)+'楼');
									}
								}
								
							}, 
					error: function (jqXHR, textStatus, errorThrown) { 
								alert('评论加载失败'); 
							} 
			 });
		 }
		 else if (!login_fail)//如果登陆成功则加载
		 {
			 $.ajax({ //加载评论
					async: true, 
					url: "get_comments.php", 
					type: "get", 
					dataType: 'json',
					jsonp: 'jsoncallback', 
					 data: null, 
					contentType: "application/json;utf-8", 
					success:function (data, textStatus){
								var comments = data //将php回调的json对象付给js
								if (comments==1)
								{
								}
								else
								{
									for (i=0;i<comments.length ;i++ ,comments_floor++)//遍历json对象，comments.length获取js对象个数
									{
										$('.comments_present').append('<div class="com_pre_item" id="com_pre_item'+comments_floor+'"><div class="cpi_head_img"><img src="../../img/head.jpg" alt=""/></div><div class="cpi_box"><div class="cpi_writer"></div><div class="cpi_content"></div><div class="cpi_bar"><div class="cpi_time"></div><div class="cpi_floor"></div><div class="cpi_delate">删除</div><div class="cpi_reply">回复</div></div></div></div>');
										 $('#com_pre_item'+comments_floor).find('.cpi_writer').text(comments[i].writer);
										 $('#com_pre_item'+comments_floor).find('.cpi_content').text(comments[i].content);
										 $('#com_pre_item'+comments_floor).find('.cpi_time').text(comments[i].time);
										 $('#com_pre_item'+comments_floor).find('.cpi_floor').text((comments_floor+1)+'楼');
									}
								}
								
							}, 
					error: function (jqXHR, textStatus, errorThrown) { 
								alert('评论加载失败'); 
							} 
			 });
		 }
		 
		 $('#go_where').css({'left':$('.main').offset().left+$('.main').width()-$('#sidebar').width(),'display':'none'});
		 $(window).scroll(function(){
				if ($(window).scrollTop()>$('#sidebar').height()+$('#nav').height())
				{
					$('#go_where').show();
				}
				else{$('#go_where').hide();}
		 });
		 $('#go_top').click(function(){
			$('body,html').animate({'scrollTop':0},500);
		 });
		 $('#go_p_comments').click(function(){
			$('body,html').animate({'scrollTop':$('#comments_present').offset().top-50},500);
		 });
		 $('#go_w_comments').click(function(){
			$('body,html').animate({'scrollTop':$('#comments_write').offset().top-50},500);
		 });

		 $('#cwb_yes').click(function(){
			 if ($('.comments_writer').val().length>0 && $('.comments_content').text().length>0 )
			 { 
				 if ($('.comments_writer').val().length<=20 && $('.comments_content').text().length<=1000)
				 {
					var d = new Date();
					//var file_name = ''+d.getFullYear()+'-'+(d.getMonth()+1)+'-'+(d.getDate())+'-'+(d.getHours())+'-'+(d.getMinutes())+'-'+(d.getSeconds());
					var month=d.getMonth()+1,
						date = d.getDate(),
						hours = d.getHours(),
						minutes = d.getMinutes(),
						seconds = d.getSeconds();
					if (month<10)
					{
						month = '0'+ month;
					}
					if (date<10)
					{
						date = '0'+ date;
					}
					if (hours<10)
					{
						hours = '0'+ hours;
					}
					if (minutes<10)
					{
						minutes = '0'+ minutes;
					}
					if (seconds<10)
					{
						seconds = '0'+seconds;
					}
					var comments_ti = ''+d.getFullYear()+'-'+month+'-'+date+' '+hours+':'+minutes+':'+seconds;
					$.ajax({ 
						async: true, 
						url: "comments.php", 
						type: "get", //如果有数据要传递用get
						dataType: 'json',
						jsonp: 'jsoncallback', 
						
						  data: {
									comments_writer  : $('.comments_writer').val(),//评论人
									comments_content  : $('.comments_content').text(),//评论时间
									comments_time   : comments_ti//评论时间
								}, 
						  contentType: "application/json;utf-8", 
						success:function (data, textStatus){//这里跟还有一个需要改进的地方是，要确认文章是否存在
							
							comments_floor = $('.com_pre_item').length;
							if (login_fail)
							{
								$('.comments_present').append('<div class="com_pre_item" id="com_pre_item'+comments_floor+'"><div class="cpi_writer"></div><div class="cpi_content"></div><div class="cpi_bar"><div class="cpi_time"></div><div class="cpi_floor"></div></div></div>');
									 $('#com_pre_item'+comments_floor).find('.cpi_writer').text(data.comments_writer);
									 $('#com_pre_item'+comments_floor).find('.cpi_content').text(data.comments_content);
									 $('#com_pre_item'+comments_floor).find('.cpi_time').text(data.comments_time);
									 $('#com_pre_item'+comments_floor).find('.cpi_floor').text((comments_floor+1)+'楼');
								
								 $.ajax({ 
									async: true, 
									url: "../../news-send.php", 
									type: "post", 
									dataType: 'json',
									jsonp: 'jsoncallback', 
									data: {href:window.location.href,
											who:$('.comments_writer').val(),
											title:$('#paper_title').text(),
											summary:$('.comments_content').text(),
											time:comments_ti
											}, 
									//contentType: "application/json;utf-8", 
									success:function (data, textStatus){
									}, 
									error: function (jqXHR, textStatus, errorThrown) { 
										alert('消息发送失败'); 
									} 
								 });

							}
							else
							{
								$('.comments_present').append('<div class="com_pre_item" id="com_pre_item'+comments_floor+'"><div class="cpi_head_img"><img src="../../img/head.jpg" alt=""/></div><div class="cpi_box"><div class="cpi_writer"></div><div class="cpi_content"></div><div class="cpi_bar"><div class="cpi_time"></div><div class="cpi_floor"></div><div class="cpi_delate">删除</div><div class="cpi_reply">回复</div></div></div></div>');
									 $('#com_pre_item'+comments_floor).find('.cpi_writer').text(data.comments_writer);
									 $('#com_pre_item'+comments_floor).find('.cpi_content').text(data.comments_content);
									 $('#com_pre_item'+comments_floor).find('.cpi_time').text(data.comments_time);
									 $('#com_pre_item'+comments_floor).find('.cpi_floor').text((comments_floor+1)+'楼');
							}
							 //添加评论，并为其添加id,这样做是因为为了下面复制方便，否则会因为一些html标签的出现，而导致不能完全表现内容

							 $('.comments_writer').val('');//清空评论区
							 $('.comments_content').text('');
							 comments_floor = comments_floor+1;//自加，为了下一楼
						}, 
						error: function (jqXHR, textStatus, errorThrown) { 
							alert('文章可能不存在'); 
						} 
				   });
				 }
				 else if ($('.comments_writer').val().length>20)
				 {
					 alert('评论名最长为20');
				 }
				 else if ($('.comments_content').text().length>1000)
				 {
					 alert('评论最长为1000字');
				 }
			 }
			 
			 else{alert('评论名和内容不能为空');}	
		 });		




		  $('#delate_no').click(function(){
				
				$('.if_delate_box').animate({'top':'-25%'},300,function(){$('#layer').hide();});
		  });
		  $('#delate_yes').click(function(){//删除按钮
			  checkCookie();//核对cookie和服务器中的用户名密码是都相同，相同才能删除
			  if (!login_fail)
			  {
				  if (delate == 'delate_paper')//删除文章
				  {
					  $('#ifb_title').text('文章正在删除中');
					  $.ajax({ 
						async: true, 
						url: "../../delate_note.php", 
						type: "get", 
						dataType: 'json',
						jsonp: 'jsoncallback', 
						data: {position :$('.time').text()}, 
						contentType: "application/json;utf-8", 
						success:function (data, textStatus){
							//alert(data.position);
							window.location.href = '../../' ;
						}, 
						error: function (jqXHR, textStatus, errorThrown) { 
							alert('无法删除'); 
						} 
					 });
				  }
				  else if (delate == 'cpi_delate')//删除评论
				  {
					  //$('#ifb_title').text('评论正在删除中');
					  //alert(cpi_delate_floor+'');
					  $.ajax({ 
							async: true, 
							url: "delate_comments.php", 
							type: "post", 
							dataType: 'json',
							jsonp: 'jsoncallback', 
							data: { floor : cpi_delate_floor }, 
							//contentType: "application/json;utf-8", 
							success:function (data, textStatus){
								$('.if_delate_box').animate({'top':'-25%'},300,function(){$('#layer').hide();});
								$('.com_pre_item').eq(cpi_delate_floor).remove();
							}, 
							error: function (jqXHR, textStatus, errorThrown) { 
								alert('无法删除'); 
							} 
						 });
				  }
			  }
			  else{$('#ifb_title').text('请重新登录');}
		  });
		  var delate = '';
		  $('#delate_paper').click(function(){
				$('#layer').show();
				$('#ifb_title').text('确定要删除这篇文章吗');
				$('.if_delate_box').animate({'top':'25%'},500);
				delate = 'delate_paper' ;
		  });
		  var cpi_delate_floor ;
		  $('.comments_present').on('click','.cpi_delate',function(){//直接使用click是无法对动态加载的元素进行操作的，在jquery--1.9之前有live，之后统一使用on，删除了live
																	//对于on替代live的方法，如上行所示需要先绑定父元素【$('.comments_present')】,再声明会动态加载的元素【'.cpi_delate'】
				$('#layer').show();
				$('#ifb_title').text('确定要删除这条评论吗');
				$('.if_delate_box').animate({'top':'25%'},500);
				delate = 'cpi_delate' ; 
				cpi_delate_floor = $(this).parents('.com_pre_item').index();
		  });

