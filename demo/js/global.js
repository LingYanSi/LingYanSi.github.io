		var flag = {'phone':false,'msie':false,'weixin':false,'ios':false,'iphone':false,'ipad':false,'android':false,'webkit':false,'firefox':false}; //新建一个对象，用以存储【手机判断】【ie判断】
		flagCheck();
		function flagCheck(){ //对PC、手机端做出判断吧、
			var userAgentInfo = navigator.userAgent.toLowerCase();
			var Agents = ["android", "iphone",
						"symbianos", "windows phone",
						"ipad", "ipod"];//用来判断浏览器，手机
			for (var v = 0; v < Agents.length; v++) {
				if (userAgentInfo.indexOf(Agents[v]) > 0) {
					flag.phone = true; //判断是不是手机端
					break;
				}
			}
			check('msie'); //判断 ie
			check('micromessenger'); //判断 weixin
			check('ios'); //判断 iOS
			check('iphone'); //判断 iPhone
			check('ios'); //判断 iOS
			check('android'); //判断 android
			check('webkit'); //是不是 webkit内核
			check('firefox'); //是不是火狐
			function check(tag){
				if (userAgentInfo.indexOf(tag)>0)//判断是不是微信
				{
					flag[tag] = true;
				}
			}
			var div = document.createElement('div');
			//alert(div.hasOwnProperty('id'))
		}

		//--------------------------------------------cookie相关区域--------------------------------------------------
		function getCookie(){ //获取cookie
			var username = localStorage.name ;
			var password = localStorage.password ;
			//console.log(typeof(username))
			if ( Boolean(username) && Boolean(password) ) //cookie是否完整，如果完整就ajax一下，如果验证通过，就返回个人信息，加载一些东西
			{
				$('#account').val(username);
				$('#password').val(password);
				//checkCookie();
			}else if (username) //
			{
				$('#account').val(username);
			}
		}
		function setCookie(username,password){ //存储cookie
			localStorage.name = username ;
			localStorage.password = password ;
		}
		function cleanCookie(){ //存储cookie
			delete localStorage.name ;
			delete localStorage.password ;
		}
		function checkCookie(name,word){ //校验cookie
			$.ajax({ 
					async:false,
					url:xxxxxxxxxxxxx,
					type:'post',
					dataType:"text",//避免因为使用json/jsonp,出现可以访问链接，但数据无法进入success
					data:{username:name,
						  password:word},
					jsonp:"callback",
					jsonpCallback:"xxx",
					success:function(json){
						if (true)
						{
							location.href = document.referrer ;
						}
					},
					error:function(){
						//alert('网络异常');
					}
			});
		}
	$(function(){
		var winHeight =$(window).height();
		var winWidth =$(window).width();
	});