// 暂时性死区

// 只要块级作用域内存在 let命令，let声明的变量，在此作用域内锁死，不再受外界变量的影响
// 目的是为了防止在声明变量前就使用变量，从而带来一些意外的行为

var a = 123;

if (true) {
    console.log(a); // ReferenceError: a is not defined.
    let a = 456;
}

// 隐蔽的死区
// 在函数的执行过程中：参数x需要依赖y，但是参数y却没有声明
function handler(x = y, y = 2) {
    return [x, y];
}

handler(); // ReferenceError: y is not defined.
