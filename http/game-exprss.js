const http = require('http')
const fs = require('fs')
const urlParser = require('url')
const querystring = require('querystring')
const gameHandle = require('./gameHandle')
const express = require('express');

let playerWin = 0;
// 用户连续三次出同一个选项
const playerActionLast3 = [];
let sameCount = 0;
let lastPlayerAction = null;

const app = express();

// favicon 处理
app.get('/favicon.ico', function(req, res) {
    res.status(200);
    res.send();
    return;
});

// 入口页面处理
app.get('/', function(req, res) {
    res.send(fs.readFileSync(__dirname + '/index.html', 'utf-8'));
    // fs.createReadStream(__dirname + '/index.html')
    //     .pipe(res)
    return
});

// 游戏逻辑处理
app.get('/game', 
    function(req, res, next) {
        if(playerWin >= 3 || sameCount === 999){
            res.status(500)
            res.send('I quit, you are so strong!')
            return
        }
        next();
        if (res.playerWin) {
            playerWin++;
        }
    },
    function(req, res, next) {
        // console.log('>>>>>req.url:', req.url);
        // console.log('>>>>>req.query:', req.query);

        // const { url } = req;
        // const { query } = urlParser.parse(url);
        // const { action:playerAction } = querystring.parse(query);

        /**
         * express会直接帮助解析url，将参数挂在req.query上面
         */
        const { action:playerAction } = req.query;

        

        if (lastPlayerAction && playerAction === lastPlayerAction) {
            sameCount++;
        } else {
            sameCount = 0;
        }
        lastPlayerAction = playerAction
        if (sameCount >= 3) {
            res.status(400)
            res.send("you cheat!")
            sameCount = 999
            return
        }


        const result = gameHandle(playerAction);
        res.status(200);
        if(result === 0){
            res.send('tie!');
        } else if (result === 1) {
            res.send('you win!');
            res.playerWin = true
        } else {
            res.send('you lose!');
        }
        
        next();
    },
    function(req, res) {

    }
);



app.listen(8081);