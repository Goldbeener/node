/**
 * io = input & output 输入输出
 * 阻塞io与非阻塞io
 * 本质区别就是，一个系统在接受输入并处理的的时候能否接受新的输入
 * 如果在处理一个输入的同时还可以接受其他的新的输入，那么就是非阻塞io
 * 否则就是阻塞io
 * 
 * 理解阻塞io与非阻塞io
 * 首先需要一个进行io的系统，也就是研究阻塞和非阻塞的对象，因为同一个事件针对不同的角色可能会得出不同的结论
 * 其次要针对第一步确定的对象，来确定该对象在处理输入的时候能否接受新的输入
 */

const glob = require('glob')
// let result = null
// console.time('glob');
// result = glob.sync(__dirname + '/**/*')
// console.timeEnd('glob');
// console.log(result)

console.time('glob')
glob(__dirname + '*/**', (err, matches) => {
    if(err){
        throw new Error()
    }
    console.log(matches)
})
console.timeEnd('glob')
console.log(1 + 1)

/**
 * 通过回调函数来获取操作结果的编程，异步编程
 * 
 * 异步编程的参数规范
 * err-first style  回调函数的第一个参数必须是error
 * 
 * 异步流程控制问题
 * 容易引起回调地狱
 * 多异步操作协同问题比较难以处理
 * 
 * 曾经的解决方案
 * asyncjs
 * thunk
 * 
 * 异步编程解决方案
 * promise
 * 
 * 
 */
