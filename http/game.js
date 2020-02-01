const http = require('http')
const fs = require('fs')
const urlParser = require('url')
const querystring = require('querystring')
const gameHandle = require('./gameHandle')

let playerWin = 0;
// 用户连续三次出同一个选项
const playerActionLast3 = [];
let sameCount = 0;
let lastPlayerAction = null;

http
    .createServer((req, res) => {
        const { url } = req
        const { pathname, query } = urlParser.parse(url);

        // favicon 请求
        if(pathname === 'favicon.ico'){
            res.writeHead(200)
            res.end()
            return
        }

        // 请求操作
        if(pathname === '/game'){
            const { action:playerAction } = querystring.parse(query)

            if(playerWin >= 3 || sameCount === 999){
                res.writeHead(500)
                res.end('I quit, you are so strong!')
                return
            }

            // 防作弊逻辑
            // 方案1
            // playerActionLast3.push(playerAction);
            // if(playerActionLast3.length > 3){
            //     playerActionLast3.shift()
            // }
            // if (playerActionLast3.length === 3) {
            //     if (playerActionLast3[0] === playerActionLast3[1] && playerActionLast3[1] === playerActionLast3[2]) {
            //         res.end("you can't play one action for 3 times!")
            //         return
            //     }
            // }

            //方案2
            if (lastPlayerAction && playerAction === lastPlayerAction) {
                sameCount++;
            } else {
                sameCount = 0;
            }
            lastPlayerAction = playerAction
            if (sameCount >= 3) {
                res.writeHead(400)
                res.end("you cheat!")
                sameCount = 999
                return
            }


            const result = gameHandle(playerAction);
            if(result === 0){
                res.end('tie!')
            } else if (result === 1) {
                playerWin++;
                res.end('you win!')
            } else {
                res.end('you lose!')
            }
            
            return
        }

        // 首页内容
        if(pathname === '/'){
            fs.createReadStream(__dirname + '/index.html')
                .pipe(res)
            return
        }
        
    })
    .listen(8081)