
/*
    $ele: 父元素
    arr: 图片数组
    url: 当前图片
*/

function Slider($ele, arr, url){
    this.$ele = $ele
    this.arr = arr

    this.$items = [].slice.call($ele.querySelectorAll('.preview-item'))
    this.endNum = 0
    this.currentIndex = arr.indexOf(url)

    this.load = ()=>{
        this.pinch = new Pinch(this.$ele, this.$img, (TX, TY, dimension)=>{
            if(TX < 0){
                this.$next.style.cssText += `;transform: translate3D( ${TX + dimension.width}px , -50%, 0);`
                this.$prev.style.cssText += `;transform: translate3D( -100% , -50%, 0);`
            }else {
                this.$prev.style.cssText += `;transform: translate3D( ${TX - dimension.width}px , -50%, 0);`
                this.$next.style.cssText += `;transform: translate3D( 100% , -50%, 0);`
            }
        } ,
        (TX, TY, dimension) => {
            const MAX = 100
            if(TX == 0) return
            this.$current.style.cssText += `;transform: translate3D( ${TX}px, -50%, 0);`
            this.$next.clientHeight

            this.$current.style.cssText += `;transition: .3s;`
            if(TX<0){
                this.$next.style.cssText += `;transition: .3s;`
                this.$next.clientHeight
                this.$next.style.cssText += Math.abs(TX) > MAX ? `;transform: translate3D( 0% , -50%, 0);` : `;transform: translate3D( 100% , -50%, 0);`
            }else {
                this.$prev.style.cssText += `;transition: .3s;`
                this.$prev.clientHeight
                this.$prev.style.cssText += Math.abs(TX) > MAX ? `;transform: translate3D( 0% , -50%, 0);` : `;transform: translate3D( -100% , -50%, 0);`
            }

            this.direction = Math.abs(TX) > MAX ? -TX/Math.abs(TX) : 0
            this.$current.style.cssText += Math.abs(TX) > MAX ? `;transform: translate3D( ${TX/Math.abs(TX)*100}% , -50%, 0);` : `;transform: translate3D( 0, -50%, 0);`

            // 移除事件监听，避免有不必要的响应
            this.pinch.removeEventListener()
        })
        this.tap = Tap(this.$img, (event)=> {
            const touch = event.changedTouches[0]
            const center = {
                x: touch.clientX,
                y: touch.clientY,
                x1: touch.clientX,
                y1: touch.clientY
            }
            // 添加放大中心
            this.pinch.toggle(center)
        }, 2, 600)
    }

    this.end = ()=>{
        this.endNum++
        if(this.endNum < 2) return
        this.endNum = 0

        let $dom = this.direction == 0 ? this.$current : (this.direction<0 ? this.$prev : this.$next)
        if($dom != this.$current){
            this.$img.style.cssText += `;transform: none;`
            // debugger
            this.$img.removeEventListener('load', this.load)
            this.$ele.removeEventListener('transitionend', this.end)

            this.pinch.destory()
            this.tap.destory()
        }else {
            // 恢复时间监听
            this.pinch.addEventListener()
        }

        this.$current.style.cssText += `;transition: none;`
        this.$current.classList.remove('current')
        this.$prev.style.cssText += `;transition: none;`
        this.$prev.querySelector('img').style.cssText += `;transform: none;`

        this.$next.style.cssText += `;transition: none;`
        this.$next.querySelector('img').style.cssText += `;transform: none;`

        this.currentIndex = this.checkIndex(this.currentIndex + this.direction)

        this.init($dom)
    }
    this.init()
}

Slider.prototype.checkIndex = function(index){
    if(index < 0) {
        return this.arr.length - 1
    }
    if( index > this.arr.length - 1) {
        return 0
    }
    return index
}

Slider.prototype.init = function($dom){

    if($dom){
        if($dom == this.$current ) return
    }

    this.$current = $dom || this.$items[0]
    this.$current.classList.add('current')
    this.$current.style.cssText += `;transform: translate3D(0, -50%, 0);`
    this.$ele.addEventListener('transitionend', this.end)

    let $img = this.$img = this.$current.querySelector('img')
    // $img.addEventListener('load', this.load)
    $img.src = this.arr[this.currentIndex]
    // if($img.complete){
        // $img.removeEventListener('load', this.load)
        this.load()
    // }

    this.$next = this.$current.nextElementSibling || this.$items[0]
    this.$next.style.cssText += `;transform: translate3D(100%, -50%, 0);`
    this.$next.querySelector('img').src = this.arr[this.currentIndex + 1] || this.arr[0]


    this.$prev = this.$current.previousElementSibling || this.$items[this.$items.length - 1]
    this.$prev.style.cssText += `;transform: translate3D(-100%, -50%, 0);`
    this.$prev.querySelector('img').src = this.arr[this.currentIndex - 1] || this.arr[this.arr.length - 1]

}
