// 简单的选择器与事件系统
var $ = function($parent, s){
    if(!s){
        s = $parent
        $parent = document
    }


    let $eles = s instanceof HTMLElement ? [s] : Array.from($parent.querySelectorAll(s))
    $ELE = $eles.length > 1  ? $eles : $eles[0]

    let sth = {
        0: $ELE,
        eq(index){
            return $ele[index]
        },
        each(){
            return ($eles instanceof Array ? $eles : [$eles]).forEach
        },
        hide(){
            $eles.forEach($ele => {
                let display = getComputedStyle($ele).display
                if( display != 'none' ){
                    $ele.displayCache = display
                    $ele.style.display = 'none'
                }
            })
        },
        show(){
            $eles.forEach($ele => {
                let display =  $ele.displayCache

                if( display != 'none' ){
                    $ele.style.display = display
                }
            })
        },
        find(s){
            return $($eles[0], s)
        },
        html(html){
            if(html === undefined){
                return $eles[0].innerHTML
            }

            $eles.forEach($ele => {
                $ele.innerHTML = html
            })
        },
        on(type, selector, fn){

            if(!fn){
                fn = selector
                selector = ''
            }

            // eventCache[__id__] = {}
            // eventCache[__id__].events = []
            // eventCache[__id__].events.push(fn)

            // 监听一个事件，事件代理委托
            $eles.forEach($ele => {
                $ele.addEventListener(type, function(event){
                    if(!selector){
                        fn.call($ele, event)
                    } else {
                        selector = selector.replace(/\./g, '')
                        let $target = event.target
                        let match = false
                        // 找到符合的元素
                        while(!match && $target && $target != $ele){
                            match = $target.classList && $target.classList.contains(selector)
                            if(match){
                                fn.call($target, event)
                                continue
                            }
                            $target = $target.parentElement
                        }
                    }
                })
            })
        },
        off(type, selector, fn){

        },
        trigger(type){

        }
    }

    return sth
}

var eventCache = {}
