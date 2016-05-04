Function.prototype.bind = function( obj){
    var self = this
    var arg = [].slice.call(arguments).slice(1)
    return function(){
        self.apply(obj, arg)
    }
}
