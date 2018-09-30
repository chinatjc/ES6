// 不允许重复声明

{
    var a = 1;
    let a = 2; // SyntaxError: Identifier 'a' has already been declard
}

{
    let a = 1;
    let a = 2; // SyntaxError: Identifier 'a' has already been declard
}

// 函数中
(function handler(arg) {
    let arg = 1; // SyntaxError: Identifier 'arg' has already been declared
})();

// 在函数里的代码块内使用 let 命令声明同样的变量 arg，不会报错（作用域死区）
(function handler(arg) {
    {
        let arg = 1;
        console.log(arg);
    }
})();

