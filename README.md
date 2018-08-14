# NodeJS PayFast

```sh
npm init
npm install
docker pull mysql
docker run --name dbFast -e MYSQL_ROOT_PASSWORD=mysql -d mysql:5.7.23
mysql -h localhost -u root -p
create database payfast;
use payfast;
```
```sql
CREATE TABLE `pagamentos` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
  `forma_de_pagamento` varchar(255) NOT NULL,
  `valor` decimal(10,2) NOT NULL,
  `moeda` varchar(3) NOT NULL,
  `status` varchar(255) NOT NULL,
  `data` DATE,
  `descricao` text,
   PRIMARY KEY (id)
  );
```
## Serviço de Cartões
```
curl http://localhost:3001/cartoes/autoriza -X POST -v -H "Content-type: application/json" -d @files/cartao.json | json_pp
```
