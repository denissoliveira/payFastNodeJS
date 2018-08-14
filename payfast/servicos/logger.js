var winston = require('winston');
var fs = require('fs');

if(!fs.existsSync('logs')){
    fs.mkdirSync('logs');
}

module.exports = winston.createLogger({
    level: "info",
    transports: [
        new winston.transports.File({
            level: "info",
            filename: "logs/payfast.log",
            maxsize: 10000,
            maxFiles: 100,
            colorize: false
        })
    ]
});