
'use strict';

// 事件代理
var eventProxy = function(ele, event, selector, fun){
    // selector 有三种形式 #id .class tagname 至于属性选择器就算了
    selector = selector.toLowerCase()
    var selectType = '' ;
    switch( selector.slice(0,1) ){
        case '#':
            selectType = 'id' ;
            break
        case '.':
            selectType = 'class'
            break
        default :
            selectType = 'tag'
    }
    if( selectType != 'tag' ){
        selector = selector.slice(1)
    }
    var $ele = Object.prototype.toString.call(ele).toLocaleLowerCase().indexOf('string')>0 ? document.querySelector(ele) : ele ;
    $ele.addEventListener('click',function(event){
        var target = event.target ;
        var proxy = false ;
        while ( !proxy && target!= this) {
            if(selectType == 'class'){
                target.classList && target.classList.contains(selector) && (proxy = !proxy) ;
            }else if(selectType == 'class'){
                target.id == selector  && (proxy = !proxy)
            }else{
                target.tagName.toLowerCase() == selector  && (proxy = !proxy)
            }
            if(proxy) continue
            target = target.parentElement ;
        }

        // 更改this指向到target上
        proxy && fun && fun.call(target) ;
    })
}



// 侧边栏管理
;(()=>{
    // 把状态存储到 localStorage

    var state = {
        data: JSON.parse( localStorage.getItem('sidebar') || '{"state":[],"current":[]}' ) ,
        $boxs: [],
        toggle( index, liIndex){
            let thisState = this.data.state[index] || {} ;
            thisState.open = !thisState.open ;
            this.data.state[index] = thisState ;
            this.store();
        },
        current(index, liIndex){
            this.data.current = [index, liIndex]
            this.store();
        },
        store(){
            localStorage.setItem('sidebar',JSON.stringify(this.data) );
            this.render();
        },
        render(){
            this.data.state.forEach((item, index)=>{
                if(!item) return
                let parent = this.$boxs[index]
                let classList = parent.classList ;

                if( index=== this.data.current[0] ){
                    this.data.current[1]!=undefined ? [].slice.call(parent.querySelectorAll('li') ).forEach((i, index)=>{
                        index === this.data.current[1] ? i.classList.add('current') : i.classList.remove('current') ;
                    }) : parent.querySelector('h1').classList.add('current')
                }else{
                    parent.querySelector('h1').classList.remove('current');
                    [].slice.call(parent.querySelectorAll('li') ).forEach((i, index)=>{
                        i.classList.remove('current')
                    })
                }

                if( !classList.contains('open') && item.open ){
                    classList.add('open')
                    parent.style.height=parent.clientHeight+parent.children[1].clientHeight+'px' ;
                }
                if( classList.contains('open') && !item.open ){
                    classList.remove('open'), parent.style.height="40px" ;
                }
            })
        },
        init( data ){
            data = data || [] ;
            document.querySelector('.sidebar>.lists').innerHTML =  data.map((item)=>{
                return `<div class="box">
                    <h1 class='${item.list && item.list.length ?'havechildren':''}'>
                        <a href=${item.link?item.link:"javascript:;"}>${item.title}</a>
                    </h1>
                    ${item.list?`<ul>${item.list.map((i)=>{
                        return `<li><a href=${i.link?i.link:"javascript:;"}>${i.title}</a></li>`
                    }).join(' ')}</ul>`:''}
                </div>`
            }).join(' ');

            this.$boxs = [].slice.call( document.querySelectorAll('.box') );

            this.$boxs.forEach( (item,index)=>{
                eventProxy(item, 'click', 'h1', function(){
                    !this.parentElement.querySelector('li') ? state.current(index): state.toggle(index)
                })
                eventProxy( item , 'click', 'li',function(){
                    // 获取位置信息
                    var ind = 0 ;
                    var prev = this.previousElementSibling ;
                    while (prev) {
                        ind++
                        prev = prev.previousElementSibling ;
                    }

                    state.current(index, ind)
                })
            } )

            this.render();
        }
    }
    state.init([{
        title: '西湖',
        link:'',
        list:[{title:'三月天',link:'https://github.com'},
            {title:'三月天',link:'https://github.com'}]
    },{
        title: '西湖',
        link:'',
        list:[{title:'三月天',link:'https://github.com'},
            {title:'三月天',link:'https://github.com'}]
    },{
        title: '西湖',
        link:'',
        list:[{title:'三月天',link:'https://github.com'},
            {title:'三月天',link:'https://github.com'}]
    },{
        title: '灵隐',
        link:'',
        list:[]
    }]);

})();

// 开关切换
eventProxy('body', 'click', '.switch', function(event){
    this.nextElementSibling.classList.toggle('show')
})

// 弹出层
;(function(){
    var modal = document.createElement('div');

    modal.id = 'modal' ;

    document.body.appendChild(modal);

    eventProxy('#modal','click','.modal-close',()=>{
        Modal.close();
    })
    eventProxy('#modal','click','.modal-cancel',()=>{
        let cEle = Modal.state[ Modal.current ] ;
        cEle.cancel && cEle.cancel();
        Modal.close();
    })
    eventProxy('#modal','click','.modal-submit',()=>{
        let cEle = Modal.state[ Modal.current ] ;
        cEle.submit && cEle.submit();
        Modal.close();
    })
    eventProxy('#modal','click','.modal-close-all',()=>{
        Modal.closeAll();
    });

    window.Modal = {
        state:[],
        current: 0 ,
        alert(msg, submitFun ){
            var html = `<div class="modal-item-msg">${msg}</div>
            <div class="modal-btn-box">
                <button class="primary modal-submit">确定</button>
            </div> `
            this.open( {body: html}, submitFun )
        },
        confirm(msg, submitFun, cancelFun){
            var html = `<div class="modal-item-msg">${msg}</div>
            <div class="modal-btn-box">
                <button class="cancel modal-cancel">取消</button>
                <button class="primary modal-submit">确定</button>
            </div>`
            this.open( {body: html}, submitFun, cancelFun);
        },
        open( obj, submitFun, cancelFun ){
            // body: html字符串
            // title: 标题
            // closeBtnShow: 是否显示关闭按钮

            modal.style.display = 'block' ;

            var item = document.createElement('div');
            item.classList.add('modal-item');
            modal.appendChild(item);
            item.innerHTML = `<div class="modal-item-main">
                ${obj.title===undefined ? '' :
                `<div class="modal-item-title">
                    <h3>${obj.title}</h3>
                    <button class="modal-close"><i class="icon icon-remove"></i></button>
                </div>`}
                <div class="modal-item-content">
                    ${obj.body}
                </div>
            </div>` ;

            item.clientHeight ;
            item.querySelector('.modal-item-main').classList.add('modal-item-main-show');
            // console.log( item.querySelector('.modal-item-content').classList )

            this.state.push({
                ele: item ,
                cancel: cancelFun ,
                submit: submitFun
            });

            this.setCurrent()
        },
        setCurrent(){
            this.current = this.state.length ? this.state.length -1 : 0 ;
        },
        close(){
            var item = this.state[this.current].ele ;
            var main = item.querySelector('.modal-item-main')
            main.classList.remove('modal-item-main-show') ;

            let ONCE = false ;
            main.addEventListener('transitionend',()=>{
                // 有坑，每个css属性发生变化后都会触发transitionend
                if(ONCE) return
                ONCE = true ;
                item.remove(); // node移除，与jquery的api相似 $(item).remove()
                this.state.splice(this.current,1);

                if(!this.state.length){
                    modal.style.display = 'none' ;
                }
                this.setCurrent()
            })
        },
        closeAll(){
            this.state = [] ;
            modal.innerHTML = '';
            modal.style.display = 'none'
            this.setCurrent()
        },

    }
})()

var num = 0 ;

eventProxy('body','click','.openmodal',()=>{
    let NUM = num%3 ;
    switch (NUM) {
        case 2:
            num++
            Modal.open({
                body: `<div>
                    <button class="openmodal">再打开一个</button>
                    这都是什么几把玩意儿~
                    <button class="cancel modal-close">就这样吧</button>
                </div>`,
                title: '我是你爹'
            })
            break ;
        case 0:
            Modal.alert('你是傻逼吗'+ (num++), ()=>{
                console.log('alert确认按钮'+num)
            })
            break;
        case 1 :
            Modal.confirm('你是傻逼吗'+ (num++),()=>{
                console.log('confirm确认'+num)
            }, ()=>{
                console.log('confirm 取消'+num )
            })
            break;
        default:

    }
})

// 轮播图
