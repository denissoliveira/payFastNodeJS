var mysql  = require('mysql');

function createDBConnection(){
    return mysql.createConnection({
        host: '192.168.99.100',
        user: 'root',
        password: 'mysql',
        database: 'payfast'
    });
}

module.exports = function() {
	return createDBConnection;
}