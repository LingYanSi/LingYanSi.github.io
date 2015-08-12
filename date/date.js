/*
* 注意: 本插件不依赖任何库，不兼容IE9以下浏览器
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

// 获取任意两天之间相差的天数
/*
	要不要提供一个状态机呢？
*/


var LY_date = (function() {
	var $LY_date = document.querySelector('#LY-date') ;
    var LY_date = {
        pointDate_obj:{},
        init:function(){
        	this.render(this.nowDate().str);
        },
        nowDate: function() {
            var date = new Date();
            var d = {
                year: date.getFullYear(),
                month: date.getMonth() + 1,
                date: date.getDate(),
                day: date.getDay() || 7,
            }
            d.str = d.year + '-'+d.month+'-'+d.date ;
            return d;
        },
        render: function(datestr) { // str格式2015-07-28
            if (!this.checkDateStr(datestr)) {
                throw (new Error('时间格式错误'));
                return;
            }
            var date_obj = this.formatDate(datestr);
            this.restTable(date_obj);
            var $td = [].slice.call( $LY_date.querySelectorAll('td') ) ;
            var arg = [].slice.call(arguments).slice(1); // 获取参数信息

            $td.forEach(function(ele, index) { // 循环所有td
                var currentDate = index - date_obj.monthFirstDay + 2 ; // 找到一月第一天星期几所在位置，并把它作为计数第一个
                if (currentDate > 0 && currentDate <= date_obj.monthDates) { // currentDate要大于0，小于当月天数
                	ele.textContent= currentDate ;
                    arg.forEach(function(ele1) {
                        ele1.arr.forEach(function(ele2) {
                            if (ele2.date == currentDate) {
                                ele.classList.add( ele1.className );
                                if (ele2.LYDateId) ele.setAttribute('LYDateId', ele2.LYDateId); // 如果存在LYDateId属性，就把它存储到dom上
                            }
                        });
                    });
                }
            });

            var monthArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
	            monthArr = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
	            // monthArr = ['January ', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            var $year =  $LY_date.querySelector('.year') ;
            $year.textContent = date_obj.year ;
            $year.nextElementSibling.textContent = monthArr[date_obj.month - 1] ;
        },
        restTable: function(date_obj) { // 重置table，因为不同月的天数不同，每月第一天对应的星期也不同，所以所占行数也不同
            var hangNum = Math.ceil((date_obj.monthFirstDay + date_obj.monthDates - 1) / 7);
            var str = '<tr>' +
                '<th>一</th>' +
                '<th>二</th>' +
                '<th>三</th>' +
                '<th>四</th>' +
                '<th>五</th>' +
                '<th>六</th>' +
                '<th>日</th>' +
                '</tr>';
            for (var i = 0; i < hangNum; i++) {
                str += '<tr> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> </tr>';
            }
            $LY_date.querySelector('table').innerHTML = str ;
        },
        checkDateStr: function(datestr) {
            var arr = datestr.split('-').map(function(ele) {
                return parseInt(ele, 10);
            });
            var heihei = true;
            if (arr.length != 3) heihei = false;
            return heihei;
        },
        formatDate: function(datestr) { // str格式2015-07-28
            var arr31 = [1, 3, 5, 7, 8, 10, 12];
            var arr30 = [4, 6, 9, 11];
            var arr28 = [2];

            var pointDayArr = datestr.split('-').map(function(ele) {
                return parseInt(ele, 10);
            });
            var pointDayObj = {
                year: pointDayArr[0],
                month: pointDayArr[1],
                date: pointDayArr[2]
            }

            var date = new Date();
            var D = {
                year: date.getFullYear(),
                month: date.getMonth() + 1,
                date: date.getDate(),
                day: date.getDay() || 7
            };

            var bbb = getDiffersDates(); // 距离当前还有多少天
            var bbbday = getMonthFirstDay(D.day, bbb); // 目标日期星期几
            this.pointDate_obj = {
                year: pointDayArr[0],
                yearDates: (pointDayArr[0]) % 4 == 0 ? 366 : 365, // 一年总天数
                month: pointDayArr[1],
                monthDates: getMonthDates(pointDayArr[0], pointDayArr[1], pointDayArr[2]), // 一月总天数
                monthFirstDay: getMonthFirstDay(bbbday, (pointDayArr[2] - 1)), // 一月第一天是星期几
                date: pointDayArr[2],
                dateDiffer: bbb, // 距今有多少天，日期在前为证，日期在后为负
                day: bbbday,
                str: datestr // 时间字符串 2015-08-01 这种格式
            };
            return this.pointDate_obj ;

            function getMonthFirstDay(day, bbb) {
                // 获取当月1号星期几，所需参数，[当前星期几，与当前天数差]
                var bbbday;
                if (bbb > 0) {
                    bbbday = (day - bbb % 7) < 0 ? (day - bbb % 7) % 7 + 7 : ((day - bbb % 7) % 7 || 7);
                } else {
                    bbbday = (day + Math.abs(bbb) % 7) % 7 || 7;
                }
                return bbbday;
            }

            function getMonthDates(year, month, date) {
                var days = 0;
                arr31.forEach(function(ele) {
                    if (ele == month) days = 31;
                });
                arr30.forEach(function(ele) {
                    if (ele == month) days = 30;
                });
                arr28.forEach(function(ele) {
                    if (ele == month)
                        days = year % 4 == 0 ? 29 : 28;
                });
                return days;
            }

            function getUtilDates(year, month, date) {
                var dates = 0;
                arr31.forEach(function(ele) {
                    if (ele < month) {
                        dates += 31;
                    }
                });
                arr30.forEach(function(ele) {
                    if (ele < month) {
                        dates += 30;
                    }
                });
                arr28.forEach(function(ele) {
                    if (ele < month) {
                        dates += (year % 4 == 0 ? 29 : 28);
                    }
                });
                dates += date;
                return dates;
            }

            function getDiffersDates() {
                var day = (D.year - pointDayObj.year - 1) * 365 +
                    Math.floor((D.year - pointDayObj.year - 1) / 4) +
                    getUtilDates(D.year, D.month, D.date) +
                    (pointDayObj.year % 4 == 0 ? 366 : 365) - getUtilDates(pointDayObj.year, pointDayObj.month, pointDayObj.date);
                if (D.year == pointDayObj.year)
                    day = getUtilDates(D.year, D.month, D.date) - getUtilDates(pointDayObj.year, pointDayObj.month, pointDayObj.date);
                return day
            }
        }
    }
    LY_date.init(); // 初始化，显示当前月份
    return LY_date;
})();
