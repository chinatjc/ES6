// 函数参数的解构赋值

function add([x, y]) {
    // 通过数组的解构赋值，得到 变量x 变量y
    return x + y;
}
add([1, 2]); // 3

// 函数参数，使用默认值
function move1({x = 0, y = 0} = {}) {
    return [x, y];
}
move1({x: 1, y: 2}); // [1, 2]
move1({x: 1}); // [1, 0]
move1({}); // [0, 0]
move1(); // [0, 0]

function move2({x, y} = {0, 0}) {
    return [x, y];
}
move2({x: 1, y: 2}); // [1, 2]
move2({x: 1}); // [1, undefined]
move2({}); // [undefined, undefined]
move2(); // [0, 0]
