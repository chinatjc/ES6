// let命令声明的变量 和 const命令声明的变量 区别

// let命令声明的变量是可以改变内存地址的变量
// const命令声明的变量是不可以修改内存地址的常量

// let命令声明变量时可以不必立即初始化，const命令声明变量时必须立即初始化
let a;
const b; // SyntaxError: Missing initializer in const declaration

// let命令声明变量之后可以修改变量的内存地址，const命令声明变量之后不可以修改变量的内存地址
let a = 1;
const b = 2;
a = 3;
b = 4; // TypeError: Assignment to constant variable.
