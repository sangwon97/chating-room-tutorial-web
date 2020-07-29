/* express module */
const express = require('express')

/* socket.io module */
const socket = require('socket.io')

/* node.js basic http inner module */
const fs = require('fs')
const http = require('http')

/* create express object */
const app = express()

/* create express http server */
const server = http.createServer(app)

/* binding server on socket.io */
const io = socket(server)

/* app.use()를 사용하여 원하는 미들웨어를 추가하여 조합 가능 */
app.use('/css', express.static('./static/css'))
app.use('/js', express.static('./static/js'))

/* run by accessing root directory with GET */
app.get('/', function(request, response){
    fs.readFile('./static/js/index.html', function(err, data){
        if(err){
            response.send('에러')
        } else {
            response.writeHead(200, {'Content-Type' : 'text/html'})
            response.write(data)
            response.end()
        }
    })
})

io.sockets.on('connection' , function(socket){
    
    /* notice another socket that new user enter */
    socket.on('newUser', function(name) {
        console.log(name + ' 님이 접속하였습니다.')

        /* save name on socket */
        socket.name = name

        /* send to all sockets */
        io.sockets.emit('update', {type: 'connect', name: 'SERVER', message: name + ' 님이 접속하였습니다.'})
    })

    /* get sended message */
    socket.on('message', function(data){
        /* add sender's name on geted data */
        data.name = socket.name
        
        console.log(data)

        /* message send without sender */
        socket.broadcast.emit('update', data)
    })

    /* quit access */
    socket.on('disconnect', function(){
        console.log(socket.name + " 님이 나가셨습니다.")

        /* send quit notice without quiter */
        socket.broadcast.emit('update', {type: 'disconnect', name: 'SERVER', message: socket.name + ' 님이 나가셨습니다.'})
    })
})

/* listen server by 8080 port */
server.listen(8080, function() {
	console.log('서버 실행 중..')
})
