/*
* @Author: zikong
* @Date:   2015-09-21 15:13:11
* @Last Modified by:   zikong
* @Last Modified time: 2015-09-21 18:47:42
*/

'use strict';

var lyDate = (function(){
    // 接受一个对象，有以下可选属性
    // id: element.id
    // selectCallback: 选中日期时的回调函数
    // prevMonthCallback: 点击上一月的回调函数
    // nextMonthCallback: 点击下一月的回调参数
    // dataArr: 可绑定在日期上的数据
    var DATE = function(arg){
        var id = arg.id ,
            selectCallback = arg.selectCallback ,
            prevMonthCallback = arg.prevMonthCallback ,
            nextMonthCallback = arg.nextMonthCallback ,
            dataArr = arg.dataArr ;

        var $date = document.getElementById(id);
        $date.innerHTML = document.getElementById('LY-date-template').innerHTML ;

        var $month = $date.querySelector('.LY-date-month') ;
        var $year = $date.querySelector('.LY-date-year') ;
        var $trs = [].slice.call($date.querySelectorAll('table tr') );
        $trs.splice(0,1);

        // 新建一个时间对象
        var d = new Date();
        // 31天、30天的两个数组
        var month31 = [1,3,5,7,8,10,12];
        var month30 = [4,6,9,11];

        var tools = {
            // 存储当前[年、月、日]，以及当[前月份下的总天数]
            nowDate:{
                year: d.getFullYear() ,
                month: d.getMonth()+1 ,
                date: d.getDate() ,
                monthDays: 0 ,
                prevMonthDays: 0
            },
            // 校验[年、月、日]，重置 时间对象【 d 】
            cheackYMD: function(newYear,newMonth,newDate){
                if(newMonth>12){
                    this.nowDate.month = newMonth = 1
                    this.nowDate.year = ++newYear
                }else if(newMonth<1){
                    this.nowDate.month = newMonth = 12
                    this.nowDate.year = --newYear
                }
                d.setFullYear(newYear);
                d.setMonth(newMonth-1);
                d.setDate(1);

                this.setNowDate();
            },
            // 设置当前时间，主要解决的是：
            // 1.当前月份第一天是星期几
            // 2.这个月有几天
            // 最后重新渲染组件
            setNowDate: function(){
                // 首日星期几
                this.nowDate.day = d.getDay()?d.getDay():7 ;
                // 一个月有几天
                var month = d.getMonth();
                this.nowDate.month = ++month ;

                if(month===2){
                  this.nowDate.monthDates = d.getFullYear()%4===0?29:28 ;
                }
                month30.forEach(function(ele){
                    if(month===ele)
                        this.nowDate.monthDates = 30
                },this);
                month31.forEach(function(ele){
                    if(month===ele)
                        this.nowDate.monthDates = 31
                },this);

                this.setPrevMonthDays(--month);
                this.render();
            },
            setPrevMonthDays: function(month){
                var monthDays = 0 ;
                if(month<1)
                    month = 12
                if(month===2){
                  monthDays = d.getFullYear()%4===0?29:28 ;
                }
                month30.forEach(function(ele){
                    if(month===ele)
                        monthDays = 30
                },this);
                month31.forEach(function(ele){
                    if(month===ele)
                        monthDays = 31
                },this);
                this.nowDate.prevMonthDays = monthDays ;
            },
            // 数据渲染
            render: function(){
                var dateStart = 1 ;
                var dateEnd = this.nowDate.monthDates ;

                $month.innerHTML = this.nowDate.month ;
                $year.innerHTML = this.nowDate.year ;

                $trs.forEach(function(ele,index){
                    [].slice.call( ele.querySelectorAll('td') ).forEach(function(ele1,index1){
                        // 开头处理
                        if((index===0 && tools.nowDate.day-(index1+1)>0 ) ){
                            ele1.classList.remove('LY-date-item');
                            ele1.classList.add('LY-date-item-disabled');
                            ele1.innerHTML = tools.nowDate.prevMonthDays+index1+2-tools.nowDate.day;
                            return
                        }
                        // 结尾处理
                        if(dateStart>dateEnd){
                            ele1.classList.remove('LY-date-item');
                            ele1.classList.add('LY-date-item-disabled');
                            ele1.innerHTML = dateStart - dateEnd ;
                            dateStart++
                            return
                        }


                        ele1.classList.remove('LY-date-item-disabled');
                        ele1.classList.remove('LY-date-item-1');

                        // 是否有标记的月份
                        dataArr && dataArr.forEach(function(ele){
                            if(ele.date==dateStart)
                                ele1.classList.add('LY-date-item-1')
                        });

                        ele1.innerHTML = dateStart++ ;
                        ele1.classList.add('LY-date-item');
                    })
                });
            },
            // 初始化
            init: function(){
                // 初始化，显示当前日期
                this.cheackYMD(this.nowDate.year,this.nowDate.month,this.nowDate.date);

                var _this = this ;

                // 上一月
                $date.addEventListener('click',function(event){
                    var classlist = event.target.classList ;
                    if( classlist.contains('LY-date-year-prev') ){
                        // 上一年
                        _this.cheackYMD(--_this.nowDate.year,_this.nowDate.month,_this.nowDate.date);
                    }else if( classlist.contains('LY-date-year-next') ){
                        // 下一年
                        _this.cheackYMD(++_this.nowDate.year,_this.nowDate.month,_this.nowDate.date);
                    }else if( classlist.contains('LY-date-month-prev') ){
                        // 上一月
                        _this.cheackYMD(_this.nowDate.year,--_this.nowDate.month,_this.nowDate.date);
                    }else if( classlist.contains('LY-date-month-next') ){
                        // 下一月
                        _this.cheackYMD(_this.nowDate.year,++_this.nowDate.month,_this.nowDate.date);
                    }

                    var date = {
                        year: _this.nowDate.year ,
                        month: _this.nowDate.month
                    };
                    prevMonthCallback && prevMonthCallback( date );
                });
                // 选中日期
                $date.addEventListener('click',function(event){
                    var $dom = event.target ;
                    if(event.target.classList.contains('LY-date-item')){
                        var date = {
                            year: d.getFullYear() ,
                            month: d.getMonth()+1 ,
                            date: parseInt($dom.textContent,10)
                        }
                        console.log('被选中了:',date);
                        selectCallback && selectCallback( date,$dom );
                    }
                });
            }
        }

        tools.init();
    }
    return DATE ;
})();

