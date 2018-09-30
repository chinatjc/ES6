// 全局对象的属性
// let命令 const命令 声明的变量 不属于全局对象的属性

var a = 1;
let b = 2;
const c = 3;

console.log(window.a); // 1
console.log(window.b); // undefined
console.log(window.c); // undefined
