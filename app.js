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

app.use('/css', express.static('./static/css')
app.use('/js', express.static('./static/js')

/* run by accessing root directory with GET */
app.get('/', function(request, response){
	console.log('유저가 /으로 접속하였습니다.')
	response.send('Hello, Express Server!')
})	
	
/* listen server by 8080 port */
server.listen(8080, function() {
	console.log('서버 실행 중..')
})
