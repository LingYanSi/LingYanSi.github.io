//-----------------------------------------------------------------------------------------------------
	js��ʽ������ʵ��˼·
	$('bit').css({'background':'red'}).parent().children().find('#nihao').show();
	1. $('bit')��ȡ���� css({'background':'red'}) 
	2. ����css���Է�������style��������
	3. parent();֮���Ի��ܼ�����������Ϊ��ÿ��ִ����һ�����Է����󣬶����������󷵻ء�

	function _$(els){
		this.elements = [];
		for(var i=0, len=els.length; i<len; i++) {
            var element = els[i];
            if(typeof element === 'string') {
                element = document.getElementById(element);
            }
            this.elements.push(element);
        }
	}
// -----------��dom�л�ȡԪ��-----------------------------------------------------------------
	document.getElementById(id)
	document.getElementsByClassName(classname)//html5��������
	document.getElementsByName(name)
	document.getElementsByTagName('��ǩ��')
	
	querySelector,querySelectorAll //IE8�������ϣ������ִ������֧��
	Document��DocumentFragment��Element��ʵ����NodeSelector�ӿڡ������������͵�Ԫ�ض�ӵ������������
	querySelector����һ������
	querySelectorAll����һ������(��NodeList��������)
	document.querySelector('#nihao')
	document.querySelectorAll('#nihao')[0]
	
	document.getElementsByClassName('.haha')
	document.querySelector('.haha')
	document.querySelectorAll('.haha')[0]

	querySelector,querySelectorAll������Ԫ�ص�ʱ��Ҳ����Լ�������ȥ
	��jquery�ġ�$(selector)��������
	������ʹ��ԭ����ʱ����Ҫע���������
	jquery�Ľ������������һ��id�滻ԭ����id���ȵ���ѯ���������滻����
//--------------------------------------------------------------------------------------------

instanceof // instanceof �����ж�һ�������Ƿ�ĳ�������ʵ��
var x = new Array() ;
console.log(x instanceof Array) ;//���Ϊtrue
console.log(x instanceof Object) ;//���Ϊtrue
function instance(){
	console.log(arguments[0])
	console.log(typeof(arguments)) ;//���ΪObject
	console.log(arguments instanceof Array) //���Ϊfalse,Ҳ����˵��arguments��ֻ��һ�����󣬶�����һ�����飬������ȴ�������ĳЩ����
}
instance('haha')

//------------------------------------------------------------------------
	function $(classname){
		 if (document.getElementsByClassName) //getELementsByClassName������ȡ���д�class������Ԫ�أ�������һ����HTMLCollection������ [getElementsByTagName��getElementByIDҲ��ͬ�����Ƿ���һ��HTMLCollection����]
		 {
			 return document.getElementsByClassName(classname)
		 }else{
			 var haha = document.getElementsByTagName('*');
			 var array = new Array;
			 for (var i=0;i<haha.length ;i++ )
			 {
				 var classArray = haha[i].className.split(/\s+/) ;
				 for (var j=0 ;j<classArray.length ;j++ )
				 {
					 if (classname == classArray[j])
					 {
						 array.push(haha[i]) ;
					 }
				 }
			 }
			 return array ;
		 }
	 }
	
	console.log($('item')[0].innerHTML)

	//-- ���ڡ�HTMLCollection���Ľ���
		var c = document.forms;//���� form Ԫ�ص�һ�� HTMLCollection ����
		var firstform = c[0];//�ܹ�������������ʹ��
		var lastform = c[c.length-1];//length ���Է���Ԫ����
		var address = c["address"];//�ܹ��Թ���������ʹ��
		var address = c.address;//JavaScript ���������ı�ʾ��

	// --- HTMLCollection��NodeList�кܴ󲿷�������
	/* ��ͬ��:
		1���������������,����length���ԣ�����ͨ��forѭ������
		2������ֻ����
		3������ʵʱ�ģ����ĵ��ĸ��Ļ�������ӳ����ض�������,��һ�����⣬����document.querySelectorAll���ص�NodeList����ʵʱ��
		5������ͨ�����Եķ�ʽ����Ԫ�أ���document.forms.f1��f1Ϊform��id��
		��ͬ��:
	*/

// ----------------------------------------------------------------------------------------------
	function a(name){
		this.name = name ;
		this.changeName = function(changName){
			this.name = changName
		}
	}

// ------------------------------------------------------------------------------------------------------
	addClass
	if (element.classList)
	{
		element.classList.add(classname)
	}else{
		element.className += ' '+classname
		}

	removeClass
	if (element.classList)
	{
		element.classList.remove(classname)
	}else{
		var array = className.split(' ');
		}
	