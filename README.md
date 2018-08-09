<h1>NodeJS PayFast</h1>

npm init <br>
npm install <br>

docker pull mysql<br>
docker run --name dbFast -e MYSQL_ROOT_PASSWORD=mysql -d mysql:5.7.23<br>
Terminal - mysql -h localhost -u root -p <br>
create database payfast;<br>
use payfast;<br>
CREATE TABLE `pagamentos` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
  `forma_de_pagamento` varchar(255) NOT NULL,
  `valor` decimal(10,2) NOT NULL,
  `moeda` varchar(3) NOT NULL,
  `status` varchar(255) NOT NULL,
  `data` DATE,
  `descricao` text,
   PRIMARY KEY (id)
  );<br>
