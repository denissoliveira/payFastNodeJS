var fs = require('fs'); //já faz parte do NODEJS, usa memoria

fs.readFile('img.png', function(error, buffer){
    console.log('Arquivo Lido');
    fs.writeFile('img2.png', buffer, function(err){
        console.log('arquivo escrito');
    });
});