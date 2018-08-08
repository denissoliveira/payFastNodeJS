var express = require('express');
var app = express();

app.listen(3000, function(){
    console.log('Servidor Rodando na Porta 3000.');
});

app.get('/teste', function(req, res){
    console.log('Recebido requisicao de teste.');
    res.send('Ok.');
});