// 基础用法

// 代码块：在大括号里({})写的一组代码，结尾没有分号(;)

// let命令声明的变量 只允许在代码块中有效

{
    let a = 1;
    var b = 2;
}

// 变量a脱离了代码块，因此无法引用变量
console.log(a); // ReferenceError: a is not defined
console.log(b); // 2
