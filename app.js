const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const PORT = process.env.PORT || 1337

const dayjs = require('dayjs')

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html')
})

io.on('connection', function (socket) {
  console.log('connected!')
  socket.on('message', function (msg) {
    const now = dayjs().format("YYYY-MM-DD(ddd) HH:mm");
    io.emit('message', { msg, date: now })
  })
})

http.listen(PORT, function () {
  console.log("server listening. Port:" + PORT);
})