// 基础用法

// 使用const命令声明的变量，可以保证变量的内存地址不变
const a = 1;
a = 2; // TypeError: Assignment to constant variable.

// const 声明的对象，在不改变对象的内存地址的前提下，可以修改对象的属性
const obj = {name: '张三'};
obj.name = '李四';
console.log(obj.name); // 李四

// const命令声明变量，在声明的同时必须初始化
const b;
b = 3; // SyntaxError: Missing initializer in const declaration.
