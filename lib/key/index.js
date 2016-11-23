/*
我们期望，当用户按下某些快捷键的时候，执行某些操作
 */

 console.log('你是傻逼');

window.addEventListener('keydown', (event)=>{
    console.log(event.keyCode);
})
