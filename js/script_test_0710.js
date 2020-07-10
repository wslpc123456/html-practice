/**
 * @auther Direction
 */
//interface Class

/*
NP 命名空间
 */
   Interface=function(name,methods){
    //判断接口的参数个数
    if(arguments.length!==2){
        throw new Error('接口必须有两个参数')
    }
    this.name=name;
    this.methods=[];//定义一个内置的空数组对象,等待接受method内的元素(名称)
    for(var i=0;i<methods.length;i++){
        if(typeof methods[i]!=='string'){
            throw new Error('方法名称必须为String类型')
        }
        this.methods.push(methods[i]);
    }
};

//接口的静态方法
Interface.enImp =function(object){
    if(arguments.length < 2){ //如果检测方法接收的参数小于2 参数传递失败
        throw new Error('函数必须得有两个参数')
    }
    //获得接口实例对象
    for(var i=1;i<arguments.length;i++){
        var instanceInterface=arguments[i]; //判断函数是否是接口类的类型
        if(instanceInterface.constructor!==Interface){
            throw new Error(' 这个的参数的构造器不是Interface Class');
        }
        //循环接口实例对象里面的每一个方法
        for(var j=0;j<instanceInterface.methods.length;j++){
            var methodName=instanceInterface.methods[j]; //用一个临时接收每一个方法的名字
            //object.[key]就是方法
            if(!object[methodName] || typeof object[methodName] !=='function'){
                throw new Error('没有找到方法');
            }
        }
    }

};
/*
extend method
 */
/*
NP.extend =function (sub,sup){
    //1 用一个空函数进行中转
    var a=function(){};
    a.prototype=sup.prototype;//实现空函数的原型和超类的原型对象转换
    sub.prototype=new a();//原型继承
    sub.prototype.constructor=sub;//还原子类的构造器
    //保存父类的原型对象,方便解耦,可以方便获得父类的原型对象
    sub.supClass=sup.prototype; //定义子类的静态属性接收父类的原型对象
    //判断父类的原型对象的构造器(加保险)
    if(sup.prototype.constructor==Object.prototype.constructor){
        sup.prototype.constructor=sup; //手动欢迎父类原型对象的构造器
    }
};
*/