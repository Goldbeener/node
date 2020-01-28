
/**
 * 事件循环
 */

const eventLoop = {
    queue: [],
    loop () {
        while(this.queue.length){
            const callback = this.queue.shift()
            callback()
        }
        // 一次循环完成之后，预定下一次循环的操作
        setTimeout(this.loop.bind(this), 50)
    },
// 向事件循环队列内添加事件
    add(callback){
        this.queue.push(callback)
    }
}

eventLoop.loop()

setTimeout(() => {
    eventLoop.add(() => {
        console.log('1')
    })
}, 500)
setTimeout(() => {
    eventLoop.add(() => {
        console.log('2')
    })
}, 800)
