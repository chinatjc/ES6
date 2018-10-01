// 用途，实例

// 相互交换变量的值
let x = 1;
let y = 2;
[x, y] = [y, x];
x // 2
y // 1

// 解析函数返回的多个值
function example() {
    return [1, 2, 3];
}
let [x, y, z] = example();
x // 1
y // 2
z // 3

function example() {
    return {x: 1, y: 2, z: 3};
}
let {x, y, z} = example();
x // 1
y // 2
z // 3

// 函数参数的定义
function f([x, y, z]) {
    return x + y + z;
}
f([1, 2, 3]); // 6

function f({x, y, z}) {
    return x + y + z;
}
f({x: 1, y: 2, z: 3}); // 6

// 提取JSON数据
var jsonData = {
    id: 42,
    status: 'ok',
    data: [123, 456]
};
let {id, status, data} = jsonData;
id // 42
status // 'ok'
data // [123, 456]

// 函数参数的默认值
function request(url, methods, isJson = true) {
}
request('http://www.baidu.com', 'GET'); // isJson 为 true
