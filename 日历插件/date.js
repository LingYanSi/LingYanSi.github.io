/*
* 日历插件
* 1.提供 日期查询功能，即可以按照月份查看当每天的情况，一般只提供星期几
2. 日立首先会显示的是，当前日期
3. 根据当前日期渲染出本月的所有日期，并计算出所有日期对应星期几
4. 因为是公历，可以得出当前月份的天数

*/
var MyDate = (function(){
	var d = new Date();
	var month_31 = [1,3,5,7,8,10,12];
	var month_30 = [4,6,9,11];
	// 二月份根据2015年数不同，对应天数不同，能被四整除的年份为29天
	console.log(d.getDay());
	var year = d.getFullYear(); // 年份
	var month = d.getMonth()+1 ; // 几月份
	var day = d.getDay() || 7 ; // 星期几
	var date = d.getDate() ; // 一月中的几天

	function getMonthDate(month){
		var monthDate ;
		if(month_31.indexOf(month)>-1){
			monthDate = 31 ;
		}else if(month==2){
			if(year%4==0){
				monthDate = 29 ;
			}else{
				monthDate = 28 ;
			}
		}else{
			monthDate = 30 ;
		}
		return monthDate ;
	}

	var monthDate = getMonthDate(8);
	// 获取到monthDate后，就可以
	function toList(monthDate){
		var arr = [] ;
		for( var i=1 ,len=monthDate+1; i<len ; i++){
			arr.push('<span class="myDate-invable-item">'+i+'</span>') ;
		}
		return arr.join('') ;
	}

	console.log(month+'月有'+monthDate+'天');
	document.querySelector('#myDate').innerHTML = ( toList(monthDate) );


	// 有以上数据得出当月的天数，以及其对应星期几
	console.log(year,month,date,day);

	/*var obj = {
		template:'<div> <div> <div>左</div> <div></div> <div>右</div> </div> <div> <div>1</div> <div>2</div> <div>3</div> <div>4</div> <div>5</div> <div>6</div> <div>7</div> </div> </div>',
		render:function(){
			var div = document.createElement('div');
			div.innerHTML = this.template ;
			document.body.appendChild(div);
		}
	};
	obj.render();*/
})();