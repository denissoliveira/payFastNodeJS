var app = require('./config/express')(); // () preciso para invocar o método

app.listen(3000, function(){
    console.log('Servidor Rodando na Porta 3000.');
});

