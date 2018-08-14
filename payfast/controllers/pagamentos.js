module.exports = function(app){

    const PAGAMENTO_CRIADO = "CRIADO";
    const PAGAMENTO_CONFIRMADO = "CONFIRMADO";
    const PAGAMENTO_CANCELADO = "CANCELADO";

    var resposta = function (pagamento, confirma, deleta, cartaoService){
      let res = new Array();

      if(confirma == true){
        res.push({
          href:"http://localhost:3000/pagamentos/pagamento/" + pagamento.id,
          rel:"CONFIRMAR",
          method:"PUT"
        })
      }
      if(deleta == true){
        res.push({
          href:"http://localhost:3000/pagamentos/pagamento/" + pagamento.id,
          rel:"CANCELAR",
          method:"DELETE"
        })
      }
      let jsonArray = JSON.parse(JSON.stringify(res))
      if(cartaoService != undefined || cartaoService != null){
        return {
          dados_do_pagamanto: pagamento,
          cartao: cartaoService,
          links: jsonArray
        }
      }else {
        return {
          dados_do_pagamanto: pagamento,
          links: jsonArray
        }
      }
    }

    var conn = function(){
      var connection = app.persistencia.connectionFactory();
      return new app.persistencia.PagamentoDAO(connection);
    }

    //Teste
    app.get('/pagamentos', function(req, res){
      console.log('Recebida requisicao de teste na porta 3000.')
      res.send('OK.');
    });

    //buscar pagamento
    app.get('/pagamentos/pagamentos/:id', function(req, res){
      var id = req.params.id;
      console.log('consultando pagamento: '+id);      
  
      var pagamentoDao = conn();

      pagamentoDao.buscaPorId(id, function(erro, resultado){
        if(erro){
          console.log('erro ao consultar no banco: '+erro);
          res.status(500).send(erro);
          return;
        }
        console.log('pagamento encontrado: '+ JSON.stringify(resultado));
        res.json(resultado);
      });

    });
  
    //Cria um Pagamento
    app.post('/pagamentos/pagamento', function(req, res){

      req.assert("pagamento.forma_de_pagamento", "Forma de pagamento eh obrigatorio").notEmpty();
      req.assert("pagamento.valor", "Valor eh obrigatorio e deve ser um decimal").notEmpty().isFloat();
      req.assert("pagamento.moeda", "Moeda é obrigatória e deve ter 3 caracteres").notEmpty().len(3,3);
  
      var erros = req.validationErrors();
  
      if (erros){
        console.log('Erros de validacao encontrados');
        res.status(400).send(erros);
        return;
      }
  
      var pagamento = req.body["pagamento"];
      console.log('processando uma requisicao de um novo pagamento');
  
      pagamento.status = PAGAMENTO_CRIADO;
      pagamento.data = new Date;
  
      var pagamentoDAO = conn();
  
      pagamentoDAO.salva(pagamento, function(erro, resultado){
        if(erro){
          console.log('Erro ao inserir no banco:' + erro);
          res.status(500).send(erro);
        } else {
        pagamento.id = resultado.insertId;
        console.log('pagamento criado');
  
        if (pagamento.forma_de_pagamento == 'cartao'){
          var cartao = req.body["cartao"];
          console.log(cartao);
          
          var clienteCartoes = new app.servicos.CartoesClient();
  
          clienteCartoes.autoriza(cartao,
              function(exception, request, response, retorno){
                if(exception){
                  console.log(exception);
                  res.status(400).send(exception);
                  return;
                }
                console.log(retorno);
  
                res.location('/pagamentos/pagamento/' + pagamento.id);
  
                var response = resposta(pagamento,true,true,retorno);
  
                res.status(201).json(response);
                return;
          });
  
        } else {
          res.location('/pagamentos/pagamento/' + pagamento.id);
  
          var response = resposta(pagamento,true,true);
  
          res.status(201).json(response);
        }
      }
      });

    });

    //Atualização, consfirma um pagamento !!!
    app.put('/pagamentos/pagamento/:id', function(req, res){

      var pagamento = {};
      var id = req.params.id;
  
      pagamento.id = id;
      pagamento.status = PAGAMENTO_CONFIRMADO;
  
      var pagamentoDao = conn();
  
      pagamentoDao.atualiza(pagamento, function(erro){
          if (erro){
            res.status(500).send(erro);
            return;
          }
          console.log('Pagamento Confirmado');
          var response = resposta(pagamento,false,true);
          res.send(response);
      });
  
    });

    //Deleta um pagamento !!!
    app.delete('/pagamentos/pagamento/:id', function(req, res){
      var pagamento = {};
      var id = req.params.id;
  
      pagamento.id = id;
      pagamento.status = PAGAMENTO_CANCELADO;
  
      var pagamentoDao = conn();
  
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