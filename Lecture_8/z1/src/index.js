file = require('fs');
process = require('process');
path = require('path');

console.log("Логгер запущен");

process.stdin.resume();
process.stdin.setEncoding('utf8');

file.exists(path.normalize(__dirname+'/tmp.txt'), function (exists) {
    if (exists){
        console.log('файл существует '+path.normalize(__dirname+'/tmp.txt'));
        console.log("Очистить его (y/n)???");
        process.stdin.on('data', function (line) {
            if (line.trim().toLowerCase() == 'y') {
                file.unlink(path.normalize(__dirname+'/tmp.txt'), function(err){
                    if (err){
                        console.log("Ошибка удаления.");
                    }
                    else{
                        console.log('Файл очищен!');
                    }
                })
            }
        });
    }
  });

process.stdin.on('data', function (line) {
    if (line.trim().toLowerCase() == 'exit') {process.exit(0);}
    file.appendFile(path.normalize(__dirname+'/tmp.txt'), line, function(){});
});

process.on('exit', function () {
    console.log('Exit logger.');
  });