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

$('#render').on('click',function(){
	render(this.previousElementSibling.value,{arr:[1,2,3],className:'nidaye'});
});

function render(str){
	var df = bitch(str);
	var $td = $('td');
	var arg = [].slice.call(arguments).slice(1) ;


	$td.elements.forEach(function(ele,index){
		ele.textContent = '' ;
		var currentDate = index - df.monthFirstDay+2 ;
		if(currentDate>0 && currentDate<=df.monthDates ){
			ele.textContent = currentDate +'' ;
			arg.forEach(function(ele1){
				ele1.arr.forEach(function(ele2){
					if(ele2==currentDate) ele.classList.add(ele1.className);
				})
			});
		}
	});
}

function bitch(str){
	var pointDayArr = str.split('-').map(function(ele){
		return parseInt(ele,10);
	});
	var pointDayObj = {
		year: pointDayArr[0] ,
		month: pointDayArr[1] ,
		date : pointDayArr[2]
	}

	var date = new Date();
	var D = {
		year: date.getFullYear(),
		month:date.getMonth()+1 ,
		date:date.getDate(),
		day:date.getDay() || 7
	};

	var bbb = getDay() ;
	var bbbday = getMonthFirstDay(D.day,bbb) ;
	return {
		year:pointDayArr[0] ,
		yearDates : (pointDayArr[0])%4==0?366:365 , // 一年总天数
		month : pointDayArr[1] ,
		monthDates : getMonthDates(pointDayArr[0],pointDayArr[1],pointDayArr[2]) , // 一月总天数
		monthFirstDay : getMonthFirstDay(bbbday,(pointDayArr[2]-1)), // 一月第一天是星期几
		date : pointDayArr[2] ,
		dateDiffer : bbb , // 距今有多少天
		day : bbbday ,
		str : str // 时间字符串 2015-08-01 这种格式
	}


	function getMonthFirstDay(day,bbb){
		// 获取当月1号星期几，所需参数，[当前星期几，与当前天数差]
		var bbbday ;
		if(bbb>0){
			bbbday = (day - bbb%7)<0 ? ( day - bbb%7)%7+7  : (( day - bbb%7 )%7 || 7)
		}else{
			bbbday = ( day + Math.abs(bbb)%7)%7 || 7
		}
		return bbbday ;
	}

	function getMonthDates(year,month,date){
		var arr31 = [1,3,5,7,8,10,12];
		var arr30 = [4,6,9,11] ;
		var arr28 = [2] ;
		var days = 0 ;
		arr31.forEach(function(ele){
			if(ele==month) days = 31 ;
		});
		arr30.forEach(function(ele){
			if(ele==month) days = 30 ;
		});
		arr28.forEach(function(ele){
			if(ele==month)
				days = year%4==0 ? 29 : 28 ;
		});
		return days ;
	}

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
