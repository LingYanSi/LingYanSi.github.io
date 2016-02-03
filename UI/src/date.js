
var Sdate = function( id, date, onchange){
    var $id = document.querySelector( id);

    $ele = document.createElement('div')
    $ele.className = 'Sdate'
    document.body.appendChild($ele)

    var date = date

    if( !date ){
        date = new Date()
        date.setHours(0), date.setMinutes(0), date.setSeconds(0)
    }
    var hms_current = ''
    var obj = {
        // 渲染主结构
        render: function(){
            $ele.innerHTML = `
                <p class="switch">
                    <span data-type="prev-month">上月</span>
                    <span data-type="next-month">下月</span>
                    <span data-type="prev-year">上年</span>
                    <span data-type="next-year">下年</span>
                </p>
                <p>
                    <span class="year"></span> -
                    <span class="month"></span> -
                    <span class="date"></span>
                </p>
                <table class="table">
                    <thead>
                        <tr>
                            ${['1','2','3','4','5','6','7'].map(item=>`<th>${item}</th>`).join(' ')}
                        </tr>
                    </thead>
                    <tbody class="Sdate-list">
                    </tbody>
                </table>
                <div>
                    <p class="hours-min-sec">
                        <span data-type="hours" class="hours">时</span>
                        <span data-type="min" class="min">分</span>
                        <span data-type="sec" class="sec">秒</span>
                    </p>
                    <span class="zero">归零</span>
                    <span class="now">当前</span>
                    <span class="submit">确定</span>
                    <span class="cancel">取消</span>
                    <table class="table">
                        <thead></thead>
                        <tbody class="hms-tbody"></tbody>
                    </table>
                </div>
            `
        },

        // 生成日期数组
        getDateArr: function(){

            var startDate = new Date(date.getFullYear(), date.getMonth() )
            var start = {
                date: startDate.getDate(),
                day: startDate.getDay()
            }

            var endDate = new Date( date.getFullYear(), date.getMonth(), this.getMonthDate( date) );
            var end = {
                date: endDate.getDate() ,
                day: startDate.getDay()
            }

            var prevMonthEndDate = this.getMonthDate( new Date(date.getFullYear(), date.getMonth()-1 ) );
            var prevMonthStartDate = prevMonthEndDate-((start.day||7) -1)

            var demision = [] ;

            for (var i = 1; i <= 42; i++) {
                var hei = ''
                if( prevMonthStartDate+i <= prevMonthEndDate ){
                    hei =  `<td class="prev-item">${ prevMonthStartDate+i }</td>`
                }else{
                    if( prevMonthStartDate+i- prevMonthEndDate > end.date ){
                        hei = `<td class="next-item">${ prevMonthStartDate+i- prevMonthEndDate - end.date }</td>`
                    }else{
                        hei = `<td class="current-item ${prevMonthStartDate+i- prevMonthEndDate==date.getDate()?'current':''}" >${ prevMonthStartDate+i- prevMonthEndDate }</td>`
                    }
                }
                demision[Math.floor((i-1)/7)] = demision[Math.floor((i-1)/7)] || []
                demision[Math.floor((i-1)/7)].push(hei)
            }

            // console.log( demision )
            return demision
        },

        //  生成tr字符串
        dateRender: function list(){
            var data = this.getDateArr() ;
            $ele.querySelector('.Sdate-list').innerHTML = [1,2,3,4,5,6].map((item, index)=>{
                return `<tr>
                    ${data[index].map(item=>item).join(' ')}
                </tr>`
            }).join(' ')
        },
        // 获取一个月的总天数
        getMonthDate: function getMonthDate(date){
            return 40 - new Date(date.getFullYear(), date.getMonth(), 40).getDate()
        },
        // 时分秒字符串
        getHMS: function(type){
            var str = '',num=0 , current=0
            type = type || hms_current
            switch(type){
                case 'hours':
                    num = 23
                    current = date.getHours()
                    break
                case 'min':
                    num = 59
                    current = date.getMinutes()
                    break
                case 'sec':
                    num = 59
                    current = date.getSeconds()
                    break
            }
            for (var i = 0; i <= num; i++) {
                str += (i%6==0 ? `<tr>`:'')+`<td class="${i==current?'current':''}">${i}</td>`+(i%6==5?'</tr>':'')
            }
            return str
        },
        hmsRender(type){
            if(!hms_current && !type) return
            if(!type){
                $ele.querySelector('.hms-tbody').innerHTML = this.getHMS()
                return
            }

            $ele.querySelector('.hms-tbody').innerHTML = hms_current==type ?'':this.getHMS(type)
            hms_current = hms_current==type?'':type ;
        },
        toZero: function(){
            date.setHours(0) , date.setMinutes(0), date.setSeconds(0)
        },
        toNow: function(){
            date = new Date()
        },
        // 渲染年月日
        ymdRender: function ymdRender(){
            $ele.querySelector('.year').innerHTML = date.getFullYear()
            $ele.querySelector('.month').innerHTML = this.getFullNum( date.getMonth()+1 )
            $ele.querySelector('.date').innerHTML = this.getFullNum( date.getDate() )
        },
        // 隐藏
        hide: function(){
            $ele.classList.remove('show')
        },
        show: function(){
            $ele.classList.add('show')
        },
        events: function(){
            $id.addEventListener('click',(event)=>{
                var BCR = $id.getBoundingClientRect()
                $ele.style.cssText += `;left:${BCR.left+document.body.scrollLeft}px;top:${BCR.top+document.body.scrollTop+BCR.height}px;`
                this.show()
            })
            // 年月切换
            $ele.querySelector('.switch').addEventListener('click',(event)=>{
                var target = event.target
                if(target.tagName.toLowerCase() == 'span'){
                    var type = target.getAttribute('data-type')
                    var dates = date.getDate()

                    switch( type){
                        case 'prev-month':
                            date = new Date(date.getFullYear(), date.getMonth()-1,1,date.getHours(), date.getMinutes(), date.getSeconds() )
                            break
                        case 'next-month':
                            date = new Date(date.getFullYear(), date.getMonth()+1,1,date.getHours(), date.getMinutes(), date.getSeconds() )
                            break
                        case 'prev-year':
                            date = new Date(date.getFullYear()-1, date.getMonth(),1,date.getHours(), date.getMinutes(), date.getSeconds() )
                            break
                        case 'next-year':
                            date = new Date(date.getFullYear()+1, date.getMonth(),1,date.getHours(), date.getMinutes(), date.getSeconds() )
                            break
                    }
                    dates = Math.min( dates, this.getMonthDate(date) )
                    // console.log('那一天', dates, getMonthDate(date))
                    date.setDate(dates)

                    this.dateRender()
                    this.ymdRender()
                }
            })

            // 切换时分秒
            $ele.addEventListener('click', (event)=>{
                var classList = event.target.classList ;
                if( classList.contains('hours') || classList.contains('min') || classList.contains('sec') ){
                    var type = event.target.getAttribute('data-type')
                    this.hmsRender(type)
                }
            })

            // 选择时分秒
            $ele.querySelector('.hms-tbody').addEventListener('click', (event)=>{
                var target = event.target
                if( target.tagName.toLowerCase()=='td'){
                    var val = target.textContent
                    switch (hms_current) {
                        case 'hours':
                            date.setHours(val)
                            break;
                        case 'min':
                            date.setMinutes(val)
                            break;
                        case 'sec':
                            date.setSeconds(val)
                            break;
                        default:
                    }
                    this.hmsRender()
                }
            })

            // 时分秒归零
            $ele.querySelector('.zero').addEventListener('click',()=>{
                this.toZero()
                this.hmsRender()
            })

            // 切换到当前时间
            $ele.querySelector('.now').addEventListener('click',()=>{
                this.toNow()
                this.dateRender()
                this.ymdRender()
                this.hmsRender()
            })

            $ele.querySelector('.submit').addEventListener('click',()=>{
                this.hide()
                var returnDate = this.getReturnDate()
                $id.value = returnDate.strfull
                onchange && onchange( returnDate )
            })

            $ele.querySelector('.cancel').addEventListener('click',()=>{
                this.hide()
            })

            // 选择日期
            $ele.querySelector('.Sdate-list').addEventListener('click', (event)=>{
                var target = event.target
                if( target.tagName.toLowerCase()=='td'){
                    if(target.classList.contains('prev-item')){
                        date.setMonth( date.getMonth()-1 )
                    }
                    if(target.classList.contains('next-item')){
                        date.setMonth( date.getMonth()+1 )
                    }

                    date.setDate( target.textContent )
                    this.dateRender()
                    this.ymdRender()
                }
            })
        },
        getFullNum: function(num){
            return num<10 ? '0'+num : num
        },
        getReturnDate: function(){
            return {
                time: date.getTime(),
                str: `${date.getFullYear()}-${this.getFullNum(date.getMonth()+1)}-${this.getFullNum( date.getDate() )}`,
                strfull: `${date.getFullYear()}-${this.getFullNum( date.getMonth()+1 )}-${this.getFullNum( date.getDate() )} ${this.getFullNum( date.getHours())}:${this.getFullNum(date.getMinutes() )}:${this.getFullNum( date.getSeconds() )}`,
                date: date
            }
        },
        init: function(){
            // 渲染主结构
            this.render()
            // 日期渲染
            this.dateRender()
            // 年月日渲染
            this.ymdRender(date )
            // 时间初始化
            this.events()
        }
    }

    obj.init()

    return obj
}
