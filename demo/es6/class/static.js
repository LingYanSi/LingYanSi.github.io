// 静态方法

class Animal{
    constructor(name){
        this.name = name
    }
    // 静态方法
    static speak(sth=''){
        console.log(sth);
    }
    fuck(){
        console.log('我还不会fuck');
    }
}

// es6只支持静态属性，而不支持静态方法
Animal.legs = 4

Animal.speak(`我有${Animal.legs}脚`)
