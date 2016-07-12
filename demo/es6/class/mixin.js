// 混合继承
// 混合继承，其实是把多个class合并成一个class，来让子类继承

function mix(...mixins) {
        class Mix {}

        for (let x of mixins) {
            Copy(Mix, x)
            Copy(Mix.prototype, x.prototype)
        }

        return Mix
}

function Copy(target, source) {
    for (let key of Reflect.ownKeys(source)) {
        if (key !== "constructor" &&
            key !== "prototype" &&
            key !== "name"
        ) {
            let desc = Object.getOwnPropertyDescriptor(source, key);
            Object.defineProperty(target, key, desc);
        }
    }
}


class fuck{
    constructor(){
        this.name = '西门庆'
    }
}

class xi extends mix(fuck){
    constructor(){
        super()
        console.log(this.name);
    }
}

new xi()
