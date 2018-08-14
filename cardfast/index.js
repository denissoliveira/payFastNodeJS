var app = require('./config/express')(); // () preciso para invocar o método

app.listen(3001, function(){
    console.log('Servidor de Cartões rodando na Porta 3001.');
});

