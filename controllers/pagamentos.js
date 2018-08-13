module.exports = function(app){

    //Teste
    app.get('/pagamentos', function(req, res){
      console.log('Recebida requisicao de teste na porta 3000.')
      res.send('OK.');
    });
  
    //Cria um Pagamento
    app.post('/pagamentos/pagamento', function(req, res){
  
      req.assert("forma_de_pagamento",
          "Forma de pagamento eh obrigatorio").notEmpty();
      req.assert("valor",
        "Valor eh obrigatorio e deve ser um decimal")
          .notEmpty().isFloat();
  
      var erros = req.validationErrors();
  
      if (erros){
        console.log('Erros de validacao encontrados');
        res.status(400).send(erros);
        return;
      }
  
      var pagamento = req.body;
      console.log('processando uma requisicao de um novo pagamento');
  
      pagamento.status = 'CRIADO';
      pagamento.data = new Date;
  
      var connection = app.persistencia.connectionFactory();
      var pagamentoDao = new app.persistencia.PagamentoDAO(connection);
  
      pagamentoDao.salva(pagamento, function(erro, resultado){
        if(erro){
          console.log('Erro ao inserir no banco:' + erro);
          res.status(500).send(erro);
        } else {
          console.log('Pagamento criado');
          res.location('/pagamentos/pagamento/' +
                resultado.insertId);
    
          res.status(201).json(pagamento);
        }
      });
  
    });

    //Atualização, consfirma um pagamento !!!
    app.put('/pagamentos/pagamento/:id', function(req, res){

      var pagamento = {};
      var id = req.params.id;
  
      pagamento.id = id;
      pagamento.status = 'CONFIRMADO';
  
      var connection = app.persistencia.connectionFactory();
      var pagamentoDao = new app.persistencia.PagamentoDAO(connection);
  
      pagamentoDao.atualiza(pagamento, function(erro){
          if (erro){
            res.status(500).send(erro);
            return;
          }
          console.log('Pagamento Confirmado');
          res.send(pagamento);
      });
  
    });

    //Deleta um pagamento !!!
    app.delete('/pagamentos/pagamento/:id', function(req, res){
      var pagamento = {};
      var id = req.params.id;
  
      pagamento.id = id;
      pagamento.status = 'CANCELADO';
  
      var connection = app.persistencia.connectionFactory();
      var pagamentoDao = new app.persistencia.PagamentoDAO(connection);
  
      pagamentoDao.atualiza(pagamento, function(erro){
          if (erro){
            res.status(500).send(erro);
            return;
          }
          console.log('Pagamento cancelado');
          res.status(204).send(pagamento);
      });
    });


  }