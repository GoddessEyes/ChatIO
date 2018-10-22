//        Вызовы нужных модулей       //
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);




const port = 1488;                                                  //Порт для подключения localhost: port

//      Генерируем ники из рандомных socket.id      //
io.on('connection', function(socket){
    const name = '[User]' + (socket.id).toString().substr(1,3);       //Выдача клиенту ника 
    console.log(name + ' connected to chat!');                             //Вывод подключающихся на сервере
    socket.broadcast.emit('newUser', name);                         //Рассылка ника всем пользователям
    socket.emit('userName', name);
    

//      Приём / отправка сообщений        //    
socket.on('message', function(msg){
        console.log('User: ' + name + ' | Message: ' + msg);         //Обработчик сообщений
        socket.broadcast.emit('messageToClients', msg, name);        //Рассылка сообщений всем, кроме отправителя
        
    });

});


server.listen(port);        //Запуск сервера

module.exports = port;      //Экспорт модулей в client.js
module.exports = io;




