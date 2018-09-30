// 数组的解构赋值：按照等号左右两边的 位置 对应关系，给等号左边的变量赋值

let [a, b, c] = [3, 2, 1];
a // 3
b // 2
c // 1

let [, , third] = [4, 5, 6];
third // 6

let [x, , y] = [7, 8, 9];
x // 7
y // 9

let [first, ...remainder] = [1, 2, 3, 4, 5, 6, 7, 8];
first // 1
remainder // [2, 3, 4, 5, 6, 7, 8]

// 解构不成功，变量的值为undefined (使用数组拓展符的变量为空数组 [] )
let [x, y, ...z] = [0];
x // 0
y // undefined
z // []

// 不完全解构
let [x, y] = [1, 2, 3];
x // 1
y // 2

// 解构赋值 可以用于 嵌套结构 的数组
let [name, [[math], height]] = ['张三', [['数学'], '180cm']];
name // 张三
math // 数学
height // 180cm

// 等号右边必须是可以遍历的结构 (具备Iterator接口) ，否则会报错
let [foo] = 1;
let [foo] = NaN;
let [foo] = true;
let [foo] = undefined;
let [foo] = null;
let [foo] = {};

// 默认值
// ES6内部使用 严格等于 来判断 数组成员是否等于undefined 来决定是否使用变量的默认值
let [a, b = 123] = [6];
a // 6
b // 123

let [a, b = 123] = [6, undefined];
a // 6
b // 123

let [a, b = 123] = [6, null];
a // 6
b // null 不是严格等于 undefined，变量赋值 null

// 如果默认值是个函数，那么这个函数是个惰性函数，只有在真正用到这个函数的时候，才会求值
function fn() {
    console.log('fn run');
}
// 1
    let [a = fn()] = [1];
    // 不会运行函数fn

// 2
    [a = fn()] = [];
    // fn run

// 默认值可以引用 解构赋值 的其它变量，但是该变量必须是已经声明过的
let [x = 1, y = x] = [2];
x // 2
y // 2

// 报错
let [x = y, y = 2] = []; // ReferenceError: y is not defined






