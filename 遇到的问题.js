	
	��cssѡ���������ȼ�

	����Ѿ���.polaris����span�ڵ��������óɺ�ɫ��

	.polaris span {color:red;} 
	��ʱ�����Ҫ�ı�.beijixing����ɫΪ��ɫ��������������ǲ���ʵ�ֵģ�

	.beijixing {color:blue;} 
	�����������������Ϊ��һ����������ȼ������������໥��ͻ����ʽ���ã������ֻ��ִ�����ȼ��ϸߵ��Ǹ���

	һ����ԣ�ѡ����Խ���⣬�������ȼ�Խ�ߡ�Ҳ����ѡ����ָ���Խ׼ȷ���������ȼ���Խ�ߡ�
	ͨ��������1��ʾ��ǩ��ѡ���������ȼ�����10��ʾ��ѡ���������ȼ�����100��ʾIDѡ���������ȼ���
	������������ .polaris span {color:red;}��ѡ�������ȼ��� 10 + 1 Ҳ����11���� .polaris �����ȼ���10���������Ȼ����ʾ��ɫ���֡�
	������������֮����������ȼ������������練�ƣ�

	div.test1 .span var ���ȼ� 1+10 +10 +1  
	span#xxx .songs li ���ȼ�1+100 + 10 + 1  
	#xxx li ���ȼ� 100 +1 

	������Դ��http://developer.51cto.com/art/201009/226852.htm

	-------------------------------------------------------------------------------

	box-sizing:border-box;padding:10px;width:100%;

	���û����css����height��������js���ã���ôdiv�ĸ߶�Ϊheight+padding��Ҳ����˵��ʱborder-box��height�����padding�Ѳ�����Լ����

	js���޷���ȡ����:before��֮���ΪԪ�ص�
	jquery �ṩ��α��ѡ�����������htmlԪ�صģ��� css �� :after �� :before ��Щ��αԪ�أ�jquery �в����ܻ�ȡ��ЩαԪ�ء�
	
    -----------------------------------------------------------------------------------
	js��ȡ�߶�:

	obj.style.width(height);//������css��������width�����ܻ�ȡ��

	obj.offsetWidth(offsetHeight); //offsetWidth�õ�����widthֵ+paddingֵ+borderֵ

	obj.clientWidth(clientHeight); //offsetWidth�õ�����widthֵ+paddingֵ

	getComputedStyle �� currentStyle; //getComputedStyle �� currentStyle�Ǵ�������Ե�������������ȡ����ֵ����ͼƬ����Ļ����ʾ�Ľ���ͼƬ�ĸ߿�ֵ�������ȡ��img��ǩ��padding��borderֵ��������getComputedStyle������Firefox/IE9/Safari/Chrome/Opera�������currentStyle������IE6/7/8���������img��ǩ��ʹû������style����Ҳû��������ʽ����ôֻ��getComputedStyle�ܻ�ȡ��ֵ����ΪͼƬ����߿�ֵ��currentStyle�򷵻�auto��

	obj.naturalWidth(naturalHeight); //����HTML5������ӵ�һ����ȡԪ�ظ߿�ķ�������ֻ������Firefox/IE9/Safari/Chrome/Opera�������

	ע��: ���һ��ͼƬû�м�����ϣ����޷���ȡ�����ĸ߶ȵģ�

	--------------------------------------------------------------------------------------------
	placeholder��ʽ�趨
	[placeholder] { font-family: 'Microsoft yahei'; } //����
	::-moz-placeholder {
		color: mediumvioletred; //��ɫֵ
		text-indent: 5px; /* û���� */
		opacity: 1!important; //͸���ȣ�
	}
	:-ms-input-placeholder {
		color: mediumvioletred;
		text-indent: 5px;
	}
	::-webkit-input-placeholder {
		color: mediumvioletred;
		text-indent: 5px; //����˼�壬placeholder������
	}

	-----------------------------------------------------------------------------------------------

	css�ı��������ʾʡ�Ժ�
	{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;height:100px;width:100px;} /* �߶��Ǳ���� */

	overflow:hidden;;/* ���ݳ������ʱ���س������ֵ����� */
	text-overflow:ellipsis;;/* ���������ı����ʱ��ʾʡ�Ա��(...) ������overflow:hidden;һ��ʹ�á�*/
	white-space:nowrap;/* ������ */

	�����ֻ�����ڵ����ı�
	�����ı����·���

	overflow:hidden; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient: vertical; text-overflow: ellipsis;
	-webkit-line-clamp:2;���ֱ�ʾ����

	-----------------------------------------------------------------------------------------------

	ɾ����������
	bitch = new Object();
	bitch.name = 'nihao';

	��������ɾ��bitch��name���ԣ�����delete����
	delete bitch.name
	console.log(typeof(bitch.name)) //���undefined

	ֱ����delelteɾ�����˱���
    ɾ������ԭ�����еı���

	����һ������ �����á�new Object()��
	Ҳ�����ú�������һ�� 
	
		function bitch(){
			console.log(arguments.length)//��������βθ���
			this.name = "nihao";
			this.log = function (str){
				console.log(str);
				//console.log(arguments.length)
			}
		}
		var bitch1 = new bitch(1,2,3); //arguments.length = 3
		var allProperty = Object.getOwnPropertyNames(bitch1);//��ȡ�����������ԣ���������ʽ����
		var keys = Object.keys(bitch1) ; //��ȡ�����ö�ٵ����ԣ���������ʽ����
		bitch1.log(bitch1.name); 
		bitch1.log(allProperty); 
		bitch1.log(keys);

		var ni = new String();
		console.log(ni.hasOwnProperty('length')); //�½���string����ӵ���Լ���length����
		console.log(ni.hasOwnProperty('substring')); //�½���string��ӵ��substring����
		console.log(String.prototype.hasOwnProperty('substring')); //stringԭ��ӵ��substring����

		var input = document.createElement('input');//��js����һ��dom����
		console.log('type' in input);
		console.log(input.hasOwnProperty('placeholder'));

		Object.defineProperties//��ʱ����msdn�Ͽ�һ������Ҫ�����ڶ������Եĸ��� 
		//getOwnPropertyNames,keys��ECMAScript5����

		�ж϶����Ƿ�ӵ��һ������
		���ַ����� object.hasOwnProperty(proName) ���� proName in object //proNameΪ�ַ���
		������и����ԣ�����true�����򷵻�false

		//����һ�����ɱ����ĵ�����
	--------------------------------------------------------------------------
	
	����Array

	ֱ����ĩ�����Ԫ��,������������º�ĳ��� array.push()
	ֱ�����׶����Ԫ��,������������º�ĳ��� array.unshift()
	array[index] = bula

	array.slice(start,end) ����һ��������end����ѡ,���û����һֱ����β��������������end��
	array.splice(index,howmany,item1,item2��������) ��index��ʼɾ��Ԫ�أ�howmany��ʾҪɾ�����ٸ�Ԫ�ء���Ϊ0����item��ʾ������indexλ�õ�Ԫ��

	array.join('�ָ���')	�����������Ԫ�ط���һ���ַ�����Ԫ��ͨ��ָ���ķָ������зָ���
	array.concat(array1/item1) ���ӡ�����/�����ֵ��

	array.reverse() ��ת����

	eg: array = [0,1,2];
		array.splice(1,0,'a','b','c');
		console.log(array);//���[0,'a','b','c',1,2]
		array[10]=1;
		console.log(array.length);//���Ϊ11��Ҳ����˵��ʱ���鱻������array[7]=undefined
		array.pop();// pop() ������ɾ�� arrayObject �����һ��Ԫ�أ������鳤�ȼ� 1�����ҷ�����ɾ����Ԫ�ص�ֵ����������Ѿ�Ϊ�գ��� pop() ���ı����飬������ undefined ֵ��
		array.shift();// shift() ������ɾ�� arrayObject �ĵ�һ��Ԫ�أ������鳤�ȼ� 1�����ҷ�����ɾ����Ԫ�ص�ֵ����������Ѿ�Ϊ�գ��� pop() ���ı����飬������ undefined ֵ��
		array.join('-----');//���û�в�����Ĭ�϶��ŷָ�Ԫ��
		array.toString();//Ԫ�ؼ��Զ��ŷָ�

   --------------------------------------------------------------------------
   max-width\max-height /min-height/min-width ��css3������ȥ���ү��
   max-width��max-width����ʹ��

   background-size,background-clip,background-orign����css��������

   �鼶Ԫ��margin����
   <div id="parent" class="" style="">
		<div id="child" class="" style="margin:50px 0;height:50px;background:pink;width:100%;"></div>
		<div id="child2" class="" style="margin:50px 0;height:50px;background:pink;width:100%;"></div>
		<div id="child3" class="" style="margin:40px 0;height:50px;background:pink;width:100%;"></div>
		<div id="child4" class="" style="margin:150px 0;height:50px;background:pink;width:100%;"></div>
	</div>
	���֡�child����margin-top,margin-bottomð�ݵ���parent��������console.logһ��parent��margin-topΪ0px//���������Ϊ����Ԫ����ӡ�padding:1px/border:1px���ɽ�������Ƕ���û��padding/border�ĸ���Ԫ���ء�����ͨ��float����position:absolute���
	��child���͡�child2�����margin����50+50=100 ,��Ȼ��50px


	�����˵���У���collapsing margins�����۵�margin������˼�ǣ�2�������Ϻ�ģ��֮�䣨��ϵ���������ڻ�Ƕ�ף����ڵ�margin���ԣ���֮�䲻���зǿ����ݡ�padding����border�߿�
	��ʹ��������뷽������ϱ�ʾΪһ��������margin��
	��css2.1�У�ˮƽ��margin���ᱻ�۵���
	��ֱmargin������һЩ��ģ���б��۵���
	1���ڳ����ĵ����У�2�������ϵĿ鼶��ģ�����ڵĴ�ֱmargin�ᱻ�۵���
	���յ�marginֵ���㷽�����£�
	a��ȫ����Ϊ��ֵ��ȡ����ߣ�
	b����ȫ����ֵ����ȡ����ֵ��Ȼ������ֵ��ȥ���ֵ��
	c��û����ֵ����ȡ����ֵ��Ȼ����0��ȥ���ֵ��
	ע�⣺���ڵĺ�ģ�Ϳ�����DOMԪ�ض�̬������û�����ڻ�̳й�ϵ��
	2�����ڵĺ�ģ���У�������е�һ���Ǹ����ģ�floated������ֱmargin���ᱻ�۵�������һ�������ĺ�ģ�ͺ�������Ԫ��֮��Ҳ��������
	3��������overflow���Ե�Ԫ�غ�������Ԫ��֮���margin���ᱻ�۵���overflowȡֵΪvisible���⣩��
	4�������˾��Զ�λ��position:absolute���ĺ�ģ�ͣ���ֱmargin���ᱻ�۵������������ǵ���Ԫ��֮��Ҳ��һ����
	5��������display:inline-block��Ԫ�أ���ֱmargin���ᱻ�۵������������ǵ���Ԫ��֮��Ҳ��һ����
	6�����һ����ģ�͵�����margin���ڣ���ʱ����margin�����۵����ǣ�collapse through����������������£�Ԫ�ص�λ�ã�position��ȡ������������Ԫ�ص�margin�Ƿ��۵���
	a�����Ԫ�ص�margin�����ĸ�Ԫ�ص�margin-top�۵���һ�𣬺�ģ��border-top�ı߽綨������ĸ�Ԫ����ͬ��
	b�����⣬����Ԫ�صĸ�Ԫ�ز�����margin���۵�������˵ֻ�и�Ԫ�ص�margin-bottom�ǲ������ġ����Ԫ�ص�border-top���㣬��ôԪ�ص�border-top�߽�λ�ú�ԭ��һ����
	һ��Ӧ�������������Ԫ�ص�margin-top����������Ŀ鼶��Ԫ�ص�margin-bottom�۵���
	ע�⣬��Щ�Ѿ����۵����ǵ�Ԫ�ص�λ�ö������Ѿ����۵���Ԫ�ص�λ��û���κ�Ӱ�죻ֻ���ڶ���ЩԪ�ص���Ԫ�ض�λʱ��border-top�߽�λ�ò��Ǳ���ġ�
	7����Ԫ�صĴ�ֱmargin���ᱻ�۵���
	�����Ŀ鼶Ԫ�ص�margin-bottom������������ĸ����鼶�ֵ�Ԫ�أ�floated next in-flow block-level sibling����margin-top���ڣ������Ǹ�ͬ��Ԫ��ʹ�������������
	�����Ŀ鼶Ԫ�ص�margin-top�����ĵ�һ�������鼶��Ԫ�أ�floated first in-flow block-level child����margin-top���ڣ������Ԫ��û��border-top��û��padding-top��������Ԫ��û��ʹ�������������
	�����Ŀ鼶Ԫ�ص�margin-bottom�������������������ô�����������һ�������鼶��Ԫ�ص�margin-bottom���ڣ������Ԫ��û��ָ��padding-bottom��border����
	a��ָ����height:auto
	b��min-heightС��Ԫ�ص�ʵ��ʹ�ø߶ȣ�height��
	c��max-height����Ԫ�ص�ʵ��ʹ�ø߶ȣ�height��
	���һ��Ԫ�ص�min-height��������Ϊ0����ô����ӵ�е�margin�����ڵģ���������û��border-top��border- bottom��Ҳû��padding-top��padding-bottom������height���Կ�����0��auto�������ܰ���һ�������ĺ�ģ�� ��line box���������еĸ�����Ԫ�أ�����еĻ�����marginҲ�������ڵġ�
	��һ��Ԫ��ӵ�е�margin�۵��ˣ�������ʹ���������������ô����margin-top��ͽ��������ֵ�Ԫ�ص�����margin�۵��������������margin���޷�����鼶��Ԫ�ص�margin-bottom�۵���
	�۵���������padding��margin��border��ֵΪ�����ģ��������������������Щֵ֮�󣩣��۵����margin���㽫������ʹ�õĲ�ͬmargin��ֵ��

	-------------------------------------------------------------------------------------------------------------------------
	���ⱻ˫��ѡ��Ԫ��
	����ie��chrome��Safari������� onselectstart="return false;" 
	����Firefox�����ʽ style="-moz-user-select:none;"

	----------------------------------------------------------
	�����ֻ��˿���ʱ�򣬽��������ؼ��Ĳ�������С�
	�ֻ���Ĭ�������С��16px����ô��������������һ��12px�����壬������line-height��Ȼ��16px
	��ʵ�����˶��ģ��ʶ���������Ԫ�ص��������ø�������line-height���Է���һ
	font-size:12px;line-height:12px;
    Ҫע�⡾line-height���ļ̳�����
	------------------------------------------------------------------
	�����ֻ��˵Ļ�������
	event.stopPropagation()��ֹð��
	event.preventDefault() ��ֹĬ���¼����ڻ���������Ҫ��������ṩ��Ĭ���¼������緵����һҳ�ȡ�
	���尲����������
	id.addEventListener('touchstart',function(event){
		event.stopPropagation();
		event.targetTouches[0].screenX //��ȡX����
		event.targetTouches[0].screenY //��ȡY����
	});
	id.addEventListener('touchmove',function(event){
		event.stopPropagation();
		event.preventDefault();
	});
	id.addEventListener('touchstart',function(event){
		event.stopPropagation();
	});

	----------------------------------------------------
	����cookie�洢���ĵ�����
	��������cookie����js�ڲ��ṩ�Ķ���escape�ȡ��������ģ��洢���ڻ�ȡ�����룬�������롣
	�ڡ�segmentfault���Ͽ���Ҫʹ�á�Base64��������롣//����Ϊʲô�أ�

	cookie������
	�������ԡ�base64��Ҳ��������⣬��Ҫ����Ϊ���ڡ���ĸ�����֡��Ľ������⣬��ʱ����ں������һ������ȫ�ַ��� //�ʶ�����ʱ�仹��Ҫ�о�һ�±��뷽ʽ�ġ���һ���й����ⷽ��Ĳ��͡�

	���Ľ������: ����Ҫ�洢���ַ������б��봦������ֱ�Ӵ洢����ȡ��ʱ����С�unescape�����룬�Ϳ��Եõ��������ַ�����  //����Ӣ�Ļ���Ҳ��Ч
	�ѵ��ⲻ����ΪĬ�϶��ַ���������escape������

	---------------------------------------------------------------------------

	ajax����
	ajax ����ɷ�Ϊ��get/post������
	post�Դ������ݴ�Сû�����ƣ���get��
	postĬ��ʹ��utf-8���룬��get����,�������д������ĵ���Ҫ��ʹ��post��Ҳ���Լ��� contentType:'application/x-www-form-urlencoded; charset=UTF-8'��//��application/x-www-form-urlencoded����ʲô��˼��
	���ڿ���������Ҫʹ��jsonp��dateType:jsonp��
	post��֧�ֿ�������get֧�֡�����chrome�ϲ��Է���post��������ᱻת��get����

	ʹ��post��������
	�ִ����������ת����get���󣬶�����Ϊget����Ĭ�ϵĲ���utf-8���룬�ʶ���ʱ����������ģ��ڷ������˽��ܵ��Ľ�������
	�����Ҫ���ϡ�contentType:'application/x-www-form-urlencoded; charset=UTF-8'��

	����ֱ�� ��encodeURI(str)��//�Կ��ܺ��������ַ����ַ������б��룬�Է����̨����

-------------------------------------------------------------------------------------------------
	��������
	��ǰ������Ϊ�����һ��div�������һ�������ô�������»����Ͳ���ʹ���������Ĭ���¼���
	���շ��´��ӡ�
	var xx,yy,XX,YY,swipeX,swipeY;
	div.addEventListener('touchstart',function(event){
		xx = event.targetTouches[0].screenX;
		yy = event.targetTouches[0].screenY;
		XX = xx ;
		YY = yy ;
		swipeX = true ;
		swipeY = true ;
	});
	div.addEventListener('touchmove',function(event){
		XX = event.targetTouches[0].screenX;
		YY = event.targetTouches[0].screenY;
		if(swipeX && Math.abs(XX-xx)-Math.abs(YY-yy)>0){
			swipeY = false ;
			event.stopPropagation();
			event.preventDefault();
		}
		if(swipeY && Math.abs(XX-xx)-Math.abs(YY-yy)<0){
			swipeX = false ;
		}
	})

	-----------------------------------------------------------------------------------
	��dom��û�������ʱ��ʹ�ÿ���������������script������д���Ҳ������dom��
	document.write()
	<script type="text/javascript">
		document.write('<script type="text/javascript" src="js/jquery.10.0.min.js"></script>');
	</script>
	/*  ִ�н����������
		<script type="text/javascript">
			document.write('<script type="text/javascript" src="js/jquery.10.0.min.js"></script>');
		</script>
		<script type="text/javascript" src="js/jquery.10.0.min.js"></script>
	*/
	��������dom��
	�����jquery��

	$(function(){
		//���ﲻ��ʹ��document.write(),��������dom
	})