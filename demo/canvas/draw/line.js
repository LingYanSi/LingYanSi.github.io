
// 随便花

var bcr = {
    top: cv.getBoundingClientRect().top + $('body').scrollTop ,
    left: cv.getBoundingClientRect().left + $('body').scrollLeft
}
var down = false
var color = '#000000' ,opacity = 1 ,linewidth = 1 ;
// ct.globalCompositeOperation="destination-out"
// ct.globalCompositeOperation="source-over";

$('input#color').addEventListener('change',function(){
    color = this.value
    console.log(color, toRGBA(color, 1));
})
$('input#linewidth').addEventListener('change',function(){
    linewidth = this.value
})
$('input#opacity').addEventListener('change',function(){
    opacity = this.value/10
})
cv.addEventListener('mousedown', function(event){
    down = true
    ct.beginPath();
    ct.strokeStyle = toRGBA(color, opacity)
    ct.lineWidth = linewidth
    ct.lineJoin = 'round'
    ct.lineCap = 'round'
    ct.moveTo(event.pageX - bcr.left, event.pageY - bcr.top);
})

cv.addEventListener('mousemove', function(event){
    if(!down) return
    // ct.globalCompositeOperation="destination-out"
    ct.lineTo(event.pageX - bcr.left, event.pageY - bcr.top);
    ct.stroke();
})

cv.addEventListener('mouseup', function(){
    down = false
})
cv.addEventListener('mouseleave', function(){
    down = false
})

function xy(event){
    return {
        x: event.clientX - bcr.left ,
        y: event.clientY - bcr.top
    }
}
function toRGBA(str,opacity){
    str = str.slice(1).toLowerCase()
    var arr = str.split('').map(function(item){
        return num(item)
    })
    // console.log(str.split(''),arr,arr[1]*16+arr[0]);
    return `rgba(${arr[0]*16+arr[1]}, ${arr[2]*16+arr[3]}, ${arr[4]*16+arr[5]}, ${opacity} )`

    function num(code){
        if( !isNaN(+code) ) return +code
        switch(code){
            case 'a':
                return 10
            case 'b':
                return 11
            case 'c':
                return 12
            case 'd':
                return 13
            case 'e':
                return 14
            case 'f':
                return 15
        }
    }
}
