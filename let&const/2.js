// 跨模块常量
// 不论是 let命令 还是 const命令 通过import引进的变量，都是不可以修改变量内存地址的

// test1.js
export const a = 1;
export let b = 2;

// test2.js
import {a, b} from './test1.js';
a = 2; // TypeError: Assignment to constant variable.
b = 3; // TypeError: Assignment to constant variable.
