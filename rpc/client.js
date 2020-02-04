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

const client = new net.Socket({});

// 链接服务器
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

function encode2buffer (index) {
    const id = lessonids[index];
    const buffer = Buffer.alloc(4);
    buffer.writeInt32BE(id);
    console.log('>>>>', buffer);
    return buffer;
}

