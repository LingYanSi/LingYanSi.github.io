// 类继承

class Animal{
    constructor(name){
        this.name = name
        this.scan = '血色'
        console.log('Animal', this.name);
    }
    fuck(){
        console.log('我还不会fuck');
    }
}

class Pig extends Animal {
    constructor(name){
        // 必须super()之后
        super(name)
        this.name = '你才是猪'
        console.log(this.scan);
    }
    // 静态方法，暂时没有静态属性
    static speak(){
        console.log('我会说话呢');
    }
    fly(){
        // super可以访问父类的方法
        super.fuck()
        this.fuck()
    }
    fuck(){
        console.log('公主干母猪');
    }
}

// new Pig('七公主')
Pig.speak()
