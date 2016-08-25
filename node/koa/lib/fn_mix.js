var a1 = next => {console.log(1); next(); console.log(3)}
var a2 = next => {console.log(2)}


var pre
var sth = function(item, pre){
    return item.bind(null, pre)
}
var arr = [a1 , a2]
arr.reverse()
arr.forEach(item => {
    pre = sth(item, pre)
})
pre()
