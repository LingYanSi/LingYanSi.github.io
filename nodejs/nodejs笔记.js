2015/3/30
	1.在dos模式下，无法从C盘进入其他盘,
		C: > cd D:\nodejs //失败
	  据查得知：需要先E: 就可以进入

	2.卸载express 
		因为之前安装express是全局安装// express install -g express
		因此直接卸载，无法卸载掉// npm uninstall express 
		然后我就尝试全局卸载// npm uninstall -g express
			尼玛，输出没有安装最新的express，并把最新的express版本号导出来了 // @4.12.3
			寻思着是不是要指定版本号才能卸载，就用/* express -V */ 把当前版本号打印出来 // @4.11.2
			成功了 // npm uninstall -g express @4.11.2
			原因，之所以使用 /* npm uninstall -g express */不能成功删除，我想是因为nodejs，会自动从网络获取最新的版本号加在此命令末端

		当我再次安装express后，发现使用/* express -V */并不会打印出版本号
		百度后，得知：express在4.0版本后，将命令工具分离出来了
		也就是说需要单独安装 // express install -g express-generator
		如此这般就可以正常使用了

		使用express
			根据教程
				// express -e nodejs-demo【创建一个express项目】
			根据提示安装相关包，之后跑起来
				// express app.js
			打开 locahost:\3000 ，尼玛完全没有跑起来啊
			度娘后，得知需 //npm start
			然后成功了

		-------------------------------------------------------------------------------
			教程目录	http:// blog.fens.me/nodejs-express3/

		----------------------------------------------------------------------------------

		resetful
		以知乎为例 // http://www.zhihu.com/question/28033162#answer-11470417
		和普通的网页的区别在于，没有加上【.html】标签
			其实加不加html标签对于用户来说并不主要，知乎的url做层次很鲜明
			host:www.zhihu.com
			question //表示问题
			28033162 //表示id
			answer-11470417 //hash值，用于初次加载定位
		
		如果是比较初级的前后端分离的话，可能是这么个样子 // http://www.zhihu.com/question.html?id=28033162#answer-11470417
		上下对比，高下立判

		--------------------------------------------------------------------------------

		express的路由设置
			app.get('/',function(req,res,next){
				res.render('render',{'title':'我是谁'})
			}
			/* 
			/*get方法，获取请求'/'
			  function(req,res,next){}对这个请求做处理
				req表示请求参数
					req.query : 处理 get 请求，获取 get 请求参数 
					req.body : 处理 post 请求，获取 post 请求体
					req.pramas : 处理 /:xxx 形式的 get 或 post 请求，获取请求参数
					req.param() : 处理 get 和 post 请求，但查找优先级由高到低为 
					类型为对象
						假设请求url http://localhost:8000/about?nihao=123&haha=456
						在路由【route】的index.js中打印console.log(req.query),{nihao:'123',haha:'456'}
				res表示响应
					res.render('render',{'title':'我是谁'})
					渲染render.ejs文件，将其中的【title】变量替换为【我是谁】，然后返回给浏览器
			*/
			一般而言，上面这种请求用来返回网页
			但也有ajax请求，用来请求接口，返回json数据
			在about.ejs中写入 <script src="../public/javascripts/jquery.1.11.2.min.js"></script>
				打开chrome调试，发现错误，找不到 localhost/public/javascripts/.. 
				后来发现，不用添加前面的../public 直接引用 /javascripts/jquery...即可
				成功之后，使用
				$.ajax({
					type:'get',
					url:'http://loaclhost:3000/ajax/name',
					success:function(data){
						alert(data)
					}
				})
				在 【route/index.js】中添加
					app.get('/ajax/name',function(req,res,next){
						res.sen('ni shi shui');
					})
				可以运行

			以上的对请求进行处理的两种方式，是web常见的
				①将必要的内容，在后台进行渲染，以便于seo
				②动态加载的内容【评论，图片？】等，使用ajax方式，异步加载

			http://ued.taobao.org/blog/2014/04/full-stack-development-with-nodejs/
			这个是淘宝UED的关于前后端分离，nodejs应用的文章

			------------------------------------------------------------------------------------

		将ejs文件，配置为html文件
			在app.js将 
				app.set('view engine', 'ejs'); 
			修改为
				aapp.engine('.html', ejs.__express);
				app.set('view engine', '.html'); 
			并将view文件夹内的ejs文件修改为html类型

	   --------------------------------------------------------------------------

	   再次请求
		   根据淘宝UED前后端分离的文章，nodejs并不会和数据库关联，而是去调用Java接口
		   那么如何调用呢

		   router.get('/', function(req, res, next) {
			   //获取请求的useragent
			   console.log(req.headers['user-agent'])
				console.log(Object.getOwnPropertyNames(req))//打印出所有属性
			  var parRes = res ; // 保存响应
			  var json ;
			  var http = require('http') ;
			  var options = {
					hostname: 'app.nacute.com',   
					path: '/api/ajax/chosen/detail/462',  
					method: 'GET'
				}
				var req = http.request(options, function (res) {  
					res.setEncoding('utf8'); 
					var str = '';
					res.on('data',function(bitch){
						str+=data ; //读取参数流转化为字符串
					});
					res.on('end',function(){ //读取参数流结束后将转化的字符串解析成 JSON 格式
						str = str.replace(/[\r\n\t]/g,''); //去除换行符，回车符，以免影响字符串转json对象
						str = str.slice(1,-1);//去除两边()
						var json = {};
						try
						{
							json.JSON.parse(str);
						}catch (err)
						{
						}
						parRes.render('index', { title: json.code });
					});
				
				});  
				  
				req.on('error', function (e) {  
					console.log('problem with request: ' + e.message);  
				}); 
				req.end(); 
			});

