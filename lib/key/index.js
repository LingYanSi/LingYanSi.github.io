/*
我们期望，当用户按下某些快捷键的时候，执行某些操作
 */

 console.log('你是傻逼');

window.addEventListener('keydown', (event)=>{
    let obj = {
        'esc': 27,
        'enter': 13,
        'up': 38,
        'down': 40,
        'left': 37,
        'right': 39,
        'delete': 8
    }
    console.log(event.keyCode);
})
