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
			教程目录	http://blog.fens.me/nodejs-express3/