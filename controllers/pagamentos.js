module.exports = function(app){
    app.get('/pagamentos', function(req, res){
        console.log('Recebido requisicao de teste.');
        res.send('Ok.');
    });
}

