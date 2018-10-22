//      Нужные модули           //
const io = require('socket.io-client');
const readline = require('readline');
const socket = io.connect('http://localhost:' + 1488);

const rl = readline.createInterface({       
    input: process.stdin,
    output: process.stdout
  });



//      Обработчик  Ников          //

socket.on('userName', function(userName){              // Создаем прослушку 'userName'
    console.log(' Имя пользователя => ' + userName);        // Лог ника в консоль
});


socket.on('newUser', function(userName){                                       //Оповещение о подключение
    console.log('Новый пользователь присоединился к чату | ' + userName);          //Новых пользователей   
});


//      Обработчик сообщений        //

rl.on('line', (input) => {              //Ввод в консоль без rl.close() что бы Евент не закрывался
    socket.emit('message', input);      //Отправка на сервер 
});


socket.on('messageToClients', function(msg, name){      //Ждёт события massageToClients от сервера
    console.log(name + '  ====> ' + msg);                 //<===То что вытаскивает из события и консолит
});




    