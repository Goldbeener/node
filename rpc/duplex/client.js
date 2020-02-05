// 全双工通信
/*****
 * 数据包需要加上序列号
 */
const net = require('net');

const lessonids = [
    "136797",
    "136798",
    "136799",
    "136800",
    "136801",
    "136803",
    "136804",
    "136806",
    "136807",
    "136808",
    "136809",
    "141994",
    "143517",
    "143557",
    "143564",
    "143644",
    "146470",
    "146569",
    "146582"
]
let seq = 0;

const client = new net.Socket({});

// 连接目标服务器
client.connect({
    port: 3000
})

// 发送数据
let index = Math.floor(Math.random() * lessonids.length);
client.write(encode2buffer(index));

// 接收数据
client.on('data', buffer => {
    console.log(index, buffer.toString());

    index = Math.floor(Math.random() * lessonids.length);
    client.write(encode2buffer(index));
})

/**
 * 组装数据包
 * 数据包包含2部分
 * head = 数据包序号 + 数据长度
 * body = 数据实体
 *
 */
function encode2buffer (index) {
    const id = lessonids[index];
    const body = Buffer.alloc(4);
    body.writeInt32BE(id);

    const head = Buffer.alloc(6);
    head.writeInt16BE(seq); // 数据包序号
    head.writeInt32BE(body.length, 2); // 数据体长度

    const buffer = Buffer.concat([head, body]);

    return buffer;
}

