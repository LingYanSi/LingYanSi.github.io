2015/3/30
	1.��dosģʽ�£��޷���C�̽���������,
		C: > cd D:\nodejs //ʧ��
	  �ݲ��֪����Ҫ��E: �Ϳ��Խ���

	2.ж��express 
		��Ϊ֮ǰ��װexpress��ȫ�ְ�װ// express install -g express
		���ֱ��ж�أ��޷�ж�ص�// npm uninstall express 
		Ȼ���Ҿͳ���ȫ��ж��// npm uninstall -g express
			���꣬���û�а�װ���µ�express���������µ�express�汾�ŵ������� // @4.12.3
			Ѱ˼���ǲ���Ҫָ���汾�Ų���ж�أ�����/* express -V */ �ѵ�ǰ�汾�Ŵ�ӡ���� // @4.11.2
			�ɹ��� // npm uninstall -g express @4.11.2
			ԭ��֮����ʹ�� /* npm uninstall -g express */���ܳɹ�ɾ������������Ϊnodejs�����Զ��������ȡ���µİ汾�ż��ڴ�����ĩ��

		�����ٴΰ�װexpress�󣬷���ʹ��/* express -V */�������ӡ���汾��
		�ٶȺ󣬵�֪��express��4.0�汾�󣬽�����߷��������
		Ҳ����˵��Ҫ������װ // express install -g express-generator
		������Ϳ�������ʹ����

		ʹ��express
			���ݽ̳�
				// express -e nodejs-demo������һ��express��Ŀ��
			������ʾ��װ��ذ���֮��������
				// express app.js
			�� locahost:\3000 ��������ȫû����������
			����󣬵�֪�� //npm start
			Ȼ��ɹ���

		-------------------------------------------------------------------------------
			�̳�Ŀ¼	http:// blog.fens.me/nodejs-express3/

		----------------------------------------------------------------------------------

		resetful
		��֪��Ϊ�� // http://www.zhihu.com/question/28033162#answer-11470417
		����ͨ����ҳ���������ڣ�û�м��ϡ�.html����ǩ
			��ʵ�Ӳ���html��ǩ�����û���˵������Ҫ��֪����url����κ�����
			host:www.zhihu.com
			question //��ʾ����
			28033162 //��ʾid
			answer-11470417 //hashֵ�����ڳ��μ��ض�λ
		
		����ǱȽϳ�����ǰ��˷���Ļ�����������ô������ // http://www.zhihu.com/question.html?id=28033162#answer-11470417
		���¶Աȣ���������

		--------------------------------------------------------------------------------

		express��·������
			app.get('/',function(req,res,next){
				res.render('render',{'title':'����˭'})
			}
			/* 
			/*get��������ȡ����'/'
			  function(req,res,next){}���������������
				req��ʾ�������
					req.query : ���� get ���󣬻�ȡ get ������� 
					req.body : ���� post ���󣬻�ȡ post ������
					req.pramas : ���� /:xxx ��ʽ�� get �� post ���󣬻�ȡ�������
					req.param() : ���� get �� post ���󣬵��������ȼ��ɸߵ���Ϊ 
					����Ϊ����
						��������url http://localhost:8000/about?nihao=123&haha=456
						��·�ɡ�route����index.js�д�ӡconsole.log(req.query),{nihao:'123',haha:'456'}
				res��ʾ��Ӧ
					res.render('render',{'title':'����˭'})
					��Ⱦrender.ejs�ļ��������еġ�title�������滻Ϊ������˭����Ȼ�󷵻ظ������
			*/
			һ����ԣ�����������������������ҳ
			��Ҳ��ajax������������ӿڣ�����json����
			��about.ejs��д�� <script src="../public/javascripts/jquery.1.11.2.min.js"></script>
				��chrome���ԣ����ִ����Ҳ��� localhost/public/javascripts/.. 
				�������֣��������ǰ���../public ֱ������ /javascripts/jquery...����
				�ɹ�֮��ʹ��
				$.ajax({
					type:'get',
					url:'http://loaclhost:3000/ajax/name',
					success:function(data){
						alert(data)
					}
				})
				�� ��route/index.js�������
					app.get('/ajax/name',function(req,res,next){
						res.sen('ni shi shui');
					})
				��������

			���ϵĶ�������д�������ַ�ʽ����web������
				�ٽ���Ҫ�����ݣ��ں�̨������Ⱦ���Ա���seo
				�ڶ�̬���ص����ݡ����ۣ�ͼƬ�����ȣ�ʹ��ajax��ʽ���첽����

			http://ued.taobao.org/blog/2014/04/full-stack-development-with-nodejs/
			������Ա�UED�Ĺ���ǰ��˷��룬nodejsӦ�õ�����

			------------------------------------------------------------------------------------

		��ejs�ļ�������Ϊhtml�ļ�
			��app.js�� 
				app.set('view engine', 'ejs'); 
			�޸�Ϊ
				aapp.engine('.html', ejs.__express);
				app.set('view engine', '.html'); 
			����view�ļ����ڵ�ejs�ļ��޸�Ϊhtml����

	   --------------------------------------------------------------------------

	   �ٴ�����
		   �����Ա�UEDǰ��˷�������£�nodejs����������ݿ����������ȥ����Java�ӿ�
		   ��ô��ε�����

		   router.get('/', function(req, res, next) {
			   //��ȡ�����useragent
			   console.log(req.headers['user-agent'])
				console.log(Object.getOwnPropertyNames(req))//��ӡ����������
			  var parRes = res ; // ������Ӧ
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
						str+=data ; //��ȡ������ת��Ϊ�ַ���
					});
					res.on('end',function(){ //��ȡ������������ת�����ַ��������� JSON ��ʽ
						str = str.replace(/[\r\n\t]/g,''); //ȥ�����з����س���������Ӱ���ַ���תjson����
						str = str.slice(1,-1);//ȥ������()
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

