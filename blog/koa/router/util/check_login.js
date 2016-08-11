module.exports = function(that){
    console.log('娇艳登陆', that.cookies.get('__fuck_you__') );
    return that.cookies.get('__fuck_you__') === 'fuck__you__xijinping'
}
