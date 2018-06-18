
var winston = require('winston');

winston.remove(winston.transports.Console);
//Log timestamp
winston.add(winston.transports.Console, {timestamp: true});
//Genrate log file name winston*.log
winston.add(winston.transports.File, {filename: 'winston-basic.log'});

module.exports = winston;