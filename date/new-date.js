/*
* @Author: zikong
* @Date:   2015-09-21 15:13:11
* @Last Modified by:   zikong
* @Last Modified time: 2015-10-25 18:50:44
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
            isShow = arg.isShow===undefined?true:arg.isShow ,
            defaultTime = arg.defaultTime ,
            dateChange = arg.dateChange ,
            selectCallback = arg.selectCallback ,
            prevMonthCallback = arg.prevMonthCallback ,
            nextMonthCallback = arg.nextMonthCallback ,
            prevYearCallback = arg.prevYearCallback ,
            nextYearCallback = arg.nextYearCallback ,
            dataArr = arg.dataArr ;

            // console.log('默认时间说',defaultTime)
        var $date = document.getElementById(id);
        $date.style.display = isShow?'inline-block':'none' ;
        $date.innerHTML = document.getElementById('LY-date-template').innerHTML ;
        $date.addEventListener('selectstart',function(event){
            event.preventDefault()
        })

        if(!isShow){
            console.log('默认不显示')
            $date.addEventListener('blur',function(){
                console.log('失去了焦点')
                this.style.display = "none" ;
            },true);
        }

        var $month = $date.querySelector('.LY-date-month') ;
        var $year = $date.querySelector('.LY-date-year') ;
        var $tds = [].slice.call($date.querySelectorAll('table td') );

        // 新建一个时间对象
        var d = defaultTime ? new Date(defaultTime) : new Date();
        // 31天、30天的两个数组
        var month31 = [1,3,5,7,8,10,12];
        var month30 = [4,6,9,11];

        var tools = {
            // 存储当前[年、月、日]，以及当[前月份下的总天数]
            nowDate:{
                year: d.getFullYear() ,
                month: d.getMonth()+1 ,
                date: d.getDate() ,
                hours: d.getHours() ,
                min: d.getMinutes() ,
                sec: d.getSeconds() ,
                times: d.getTime() ,
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
                var monthDays = 0 ;
                this.nowDate.month = ++month ;

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

                // 如果当天日期为31，但有些月份只有30天/29/28天，因此需要处理一下
                if(monthDays<this.nowDate.date)
                    this.nowDate.date = monthDays

                this.nowDate.monthDays = monthDays ;

                this.setPrevMonthDays(--month);
                this.render();
            },
            resetNowDate: function(){
                d.setFullYear(this.nowDate.year);
                d.setMonth(this.nowDate.month-1);
                d.setDate(this.nowDate.date);
                d.setHours(this.nowDate.hours);
                d.setMinutes(this.nowDate.min);
                d.setSeconds(this.nowDate.sec);

                var needResetArr = ['month','date','hours','min','sec'] ;
                needResetArr.forEach(function(ele){
                   this.nowDate[ele] = this.checkValue( this.nowDate[ele] )
                },this)
            },
            checkValue: function(val){
                val = parseInt(val,10);
                if(val<10){
                    return '0'+val
                }
                return val
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
                var dateEnd = this.nowDate.monthDays ;

                this.resetNowDate();
                this.nowDate.times = d.getTime();

                $month.innerHTML = this.nowDate.month ;
                $year.innerHTML = this.nowDate.year ;

                $tds.forEach(function(ele1,index1){
                    var classList = ele1.classList ;
                    classList.remove('LY-date-item-current');
                    // 开头处理
                    if( tools.nowDate.day-(index1+1)>0  ){
                        classList.remove('LY-date-item');
                        classList.add('LY-date-item-disabled');
                        ele1.innerHTML = tools.nowDate.prevMonthDays+index1+2-tools.nowDate.day;
                        return
                    }
                    // 结尾处理
                    if(dateStart>dateEnd){
                        classList.remove('LY-date-item');
                        classList.add('LY-date-item-disabled');
                        ele1.innerHTML = dateStart - dateEnd ;
                        dateStart++
                        return
                    }
                    if(dateStart===parseInt(this.nowDate.date,10) ){
                        // 本月当前选中date
                        classList.add('LY-date-item-current');
                    }

                    classList.remove('LY-date-item-disabled');
                    classList.remove('LY-date-item-1');

                    // 是否有标记的月份
                    dataArr && dataArr.forEach(function(ele){
                        if(ele.date==dateStart)
                            classList.add('LY-date-item-1')
                    });

                    ele1.innerHTML = dateStart++ ;
                    classList.add('LY-date-item');
                },this);
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
                        prevYearCallback && prevYearCallback( _this.nowDate );
                    }else if( classlist.contains('LY-date-year-next') ){
                        // 下一年
                        _this.cheackYMD(++_this.nowDate.year,_this.nowDate.month,_this.nowDate.date);
                        nextYearCallback && nextYearCallback( _this.nowDate );
                    }else if( classlist.contains('LY-date-month-prev') ){
                        // 上一月
                        _this.cheackYMD(_this.nowDate.year,--_this.nowDate.month,_this.nowDate.date);
                        prevMonthCallback && prevMonthCallback( _this.nowDate );
                    }else if( classlist.contains('LY-date-month-next') ){
                        // 下一月
                        _this.cheackYMD(_this.nowDate.year,++_this.nowDate.month,_this.nowDate.date);
                        nextMonthCallback && nextMonthCallback( _this.nowDate );
                    }

                    var date = {
                        year: _this.nowDate.year ,
                        month: _this.nowDate.month
                    };
                    dateChange && dateChange( _this.nowDate );
                });
                // 选中日期
                $date.addEventListener('click',function(event){
                    _this.dateSelect.call(_this,event);
                });

                $date.querySelector('.LY-date-item-current').click();

            },
            dateSelect: function(event){
                var $dom = event.target ;
                if(event.target.classList.contains('LY-date-item')){

                    this.nowDate.date = parseInt($dom.textContent,10);
                    // nowDate.date被修改，从新渲染日期组件
                    this.render();

                    selectCallback && selectCallback( this.nowDate, $dom );
                    dateChange && dateChange( this.nowDate );
                }
            }
        }

        tools.init();

        return {
            dom: $date
        }
    }
    return DATE ;
})();

[].slice.call(document.querySelectorAll('.lydd-input')).forEach(function(ele){
    if(!ele.getAttribute('isDateComponent')){
        ele.setAttribute('isDateComponent',true);

        var $date = document.createElement('div');
        var idName = 'date'+ new Date().getTime();
        $date.id = idName ;

        ele.parentElement.style.position = 'relative' ;
        ele.parentElement.appendChild($date);
        var input = ele ;
        // var $date = document.querySelector('#'+idName)；
        var LD = new lyDate({
            id: idName ,
            isShow: false ,
            defaultTime: parseInt(input.getAttribute('defaultValue'),10) ,
            timeFormat: 'yy-mm-dd hh:mm:ss' ,
            selectCallback: function(date,dom){
                console.log('日期被选中了')
                if(dom.classList.contains('LY-date-item-1')){
                    console.log('选中了被标记的日期')
                }
            },
            prevMonthCallback: function(){
                console.log('上一月')
            },
            nextMonthCallback: function(){
                console.log('下一月')
            },
            dateChange: function(date){
                input.value = date.year+'-'+
                                date.month+'-'+
                                date.date+' '+
                                date.hours+':'+
                                date.min+':'+
                                date.sec ;
                ele.setAttribute('timeStr',date.times);
            }
        });
    }
    ele.addEventListener('click',function(event){
        console.log(this,event,this.getBoundingClientRect(),window.innerHeight);
        var winHeight = window.innerHeight ;
        var BoundingClientRect = this.getBoundingClientRect() ;
        if(BoundingClientRect.top>winHeight-BoundingClientRect.bottom){
            $date.style.cssText = 'position:absolute;left:0px;bottom:100%;';
        }else{
            $date.style.cssText = 'position:absolute;left:0px;top:100%;';
        }
        var $dateWrap = LD.dom ;
        if( window.getComputedStyle($dateWrap,null).display=="none" ){
            $dateWrap.style.display = "inline-block";
            $dateWrap.focus();
        }
    });

    ele.addEventListener('keydown',function(event){
        event.preventDefault();
    });
})

