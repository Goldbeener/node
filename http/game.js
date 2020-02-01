const http = require('http')
const fs = require('fs')
const urlParser = require('url')
const querystring = require('querystring')
const gameHandle = require('./gameHandle')

let playerWin = 0;
// 用户连续三次出同一个选项

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
            const result = gameHandle(playerAction);
            if(result === 0){
                res.end('tie!')
            } else if (result === 1) {
                playerWin++;
                if(playerWin >= 3){
                    res.end('I quit, you are so strong!')
                }else {
                    res.end('you win!')
                }
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