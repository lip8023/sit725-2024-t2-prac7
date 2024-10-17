var http = require("http");
var express = require("express");
var app = express();
var server = http.createServer(app); // 创建 HTTP 服务器

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const cardList = [
    {
        title: "Kitten 1",
        image: "images/kitten-1.png",
        link: "About Kitten 1",
        description: "Demo description about kitten 1" // 修正拼写错误
    },
    {
        title: "Kitten 2",
        image: "images/kitten-2.png",
        link: "About Kitten 2",
        description: "Demo description about kitten 2" // 修正拼写错误
    },
    {
        title: "Kitten 3",
        image: "images/kitten-3.png",
        link: "About Kitten 3",
        description: "Demo description about kitten 3" // 修正拼写错误
    }
];

app.get('/api/projects', (req, res) => {
    res.json({ statusCode: 200, data: cardList, message: "Success" });
});

var port = process.env.PORT || 3000; // 修正为 PORT
server.listen(port, () => { // 使用 server.listen
    console.log("App listening to: " + port);
});

let io = require('socket.io')(server); // 将 server 传递给 Socket.IO

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    setInterval(() => {
        socket.emit('number', parseInt(Math.random() * 10));
    }, 1000);
});
