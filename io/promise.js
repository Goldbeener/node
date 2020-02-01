/**
 * 异步编程解决方案
 * promise
 * 
 * 串行控制方案
 * 并行控制方案
 */

// 串行解决方案
/**
 * then&catch 回调函数的返回值默认会被包装成一个新的promise，后续的状态由该promise的状态决定，并且始终是成功的
 * (串行的异步操作，在前面的错误被捕获之后，不会影响后续的执行)
 * 可以手动在then或者catch中返回一个别的promise，那么后续的状态会由该promise最终的结果来决定
 */
// interview(1)
//     .then(() => {
//         return interview(2)
//     })
//     .then(() => {
//         return interview(3)
//     })
//     .then(() => {
//         return interview(4)
//     })
//     .then(() => {
//         console.log('success, smile')
//     })
//     .catch(e => {
//         console.log(`fail at round ${e.round}`);
//     })

// 返回值被包装成新的promise
// const promise = interview(1)
//     .then(res => {
//         return false
//     })
//     .catch(e => {
//         console.log('555')
//     })

// console.log(promise)
// setTimeout(() => {
//     console.log(promise)
// }, 800)

const geek = interview('geek')
const tecent = interview('tecent')
Promise.all([
    geek,
    tecent
])
.then(res => {
    console.log('smile')
}).catch(e => {
    console.log('cry', e.round)
})

function interview (round) {
    return new Promise((resolve, reject) => {
    setTimeout(() => {
        if (Math.random() < 0.8) {
            resolve('success')
        }else{
            const error = new Error()
            error.round = round
            reject(error)
        }
    }, 500)
    })
}