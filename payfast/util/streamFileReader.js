//
var fs = require('fs');

fs.createReadStream('img.png') //saida 
    .pipe(fs.createWriteStream('imagenStream.png')) //entrada de dados
    .on('finish', function(){ //dispara uma label e finaliza e executa o callback
        console.log('Arquivo escrito com Stream');
    });