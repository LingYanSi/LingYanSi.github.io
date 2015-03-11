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
			document.cookie = c_name+ "=" +decodeURI(name_value) + ((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
			document.cookie = c_pass+'='+ decodeURI(pass_value) + ((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
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
		async: true, 
		url: "login.php", 
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
			}
			else{
				window.location.href='index.html'
			}
		}, 
		error: function (jqXHR, textStatus, errorThrown) { 
					alert('无法登陆'); 
			} 
	});
}
checkCookie();