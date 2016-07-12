// Class的取值函数（getter）和存值函数（setter）
// 和es5中的 get set 保持一致

class Animal {
    constructor(){
        this.name = '猪八戒'
    }
    get name(){
        return '傻逼'
    }
    set name(value){
        console.log(`${value}不符合要求`);
    }
}

let zhu = new Animal()
console.log(zhu.name);
