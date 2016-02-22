
$('#add-border').addEventListener('click', function(){
    addBorder(ct,4,'rgba(100,55,200,.6)')
})
function addBorder(ct,width,color){
    width = width ? width : '5'
    color = color ? color : '#fff'
    var canvas = document.createElement('canvas')
    canvas.height = '300'
    canvas.width = '300'
    var context = canvas.getContext('2d')
    context.fillStyle = color
    context.fillRect(0,0 , 300, 300)
    context.clearRect( width , width, 300-width*2, 300-width*2)

    console.log(canvas);
    var i = new Image()
    i.src = canvas.toDataURL('image/png');
    i.onload = function(){
        ct.drawImage(i, 0 ,0, 300, 300)
    }

}
