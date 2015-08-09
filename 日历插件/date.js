/*
* 日历插件
* 1.提供 日期查询功能，即可以按照月份查看当每天的情况，一般只提供星期几
2. 日立首先会显示的是，当前日期
3. 根据当前日期渲染出本月的所有日期，并计算出所有日期对应星期几
4. 因为是公历，可以得出当前月份的天数

根据当前的日期，以及星期几，就可以当初任何年份的日历
如：今天20150809 星期7
首先我们获取年份2015年 2月份是28天 一年365天 1,3,5,7,8,10,12月31天 4,6,9,11，30天
获取今天星期7
2001年 3月11号 星期几
*/
/*function(){
	yearDay = years%4 == 0 ? 366 : 365 ;
	假设years%4 = 1
	2015年距离2001年差14年 365*14 然后算这其中包含了几个2月 3个 365*14+3，后一步起到校准作用
	这里还应该考虑的是是从哪一天开始算的

	从需求上来说，每一次都是展现一个月的信息
	也就是，切换从本质上都是月的切换。
	一个月的信息，也就是星期几的变化。
}*/

// 获取任意两天之间相差的天数
console.log( bitch('1900-07-1') );
function bitch(str){
	var pointDayArr = str.split('-').map(function(ele){
		return parseInt(ele,10);
	});
	var pointDayObj = {
		year: pointDayArr[0] ,
		month: pointDayArr[1] ,
		date : pointDayArr[2] ,
	}

	var date = new Date();
	var D = {
		year: date.getFullYear(),
		month:date.getMonth()+1 ,
		date:date.getDate(),
		day:date.getDay() || 7
	};
	var bbb = getDay() ;
	var bbbday = (D.day - bbb%7)%7 || 7;
	console.log(bbb,bbbday)
	return bbbday ;
	function getUtilDay(year,month,date){
		var arr31 = [1,3,5,7,8,10,12];
		var arr30 = [4,6,9,11] ;
		var arr28 = [2] ;
		var dates=0 ;
		arr31.forEach(function(ele){
			if(ele<month){
				dates += 31 ;
			}
		});
		arr30.forEach(function(ele){
			if(ele<month){
				dates += 30 ;
			}
		});
		arr28.forEach(function(ele){
			if(ele<month){
				dates += (year%4 == 0 ? 29 :28) ;
			}
		});
		dates += date ;
		return dates ;
	}
	function getDay(){
		var day = (D.year - pointDayObj.year-1)*365 +
			Math.floor( (D.year - pointDayObj.year-1)/4 ) +
			getUtilDay(D.year,D.month,D.date) +
			(pointDayObj.year%4==0?366:365)-getUtilDay(pointDayObj.year,pointDayObj.month,pointDayObj.date) ;
		if(D.year == pointDayObj.year)
			day = getUtilDay(D.year,D.month,D.date) - getUtilDay(pointDayObj.year,pointDayObj.month,pointDayObj.date) ;
		return day
	}

}


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
