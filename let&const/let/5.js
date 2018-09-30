// 块级作用域

// 外层作用域 无法访问 内层作用域 声明的变量
// 内层作用域 声明变量 对 外层作用域 中的同名变量 没有影响
(function func(arg) {
    console.log(1, arg);
    {
        let arg = 'inner';
        console.log(2, arg);
    }
})('outer');

// 块级作用域可以代替匿名函数，不会污染全局
(function (){
    let a = 1;
})();

{
    let a = 1;
}
