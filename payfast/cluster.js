// funciona meio que um balace tbm
var cluster = require('cluster');
var os = require('os'); //conhece sistema operacional
var cpus = os.cpus();

console.log('executanfo thread');

if (cluster.isMaster) {
    console.log('thread master');
    cpus.forEach(function(){
        cluster.fork();
    });
    cluster.on('listening', worker => {
        console.log('cluster conectado ' + worker.process.pid);
    });

    cluster.on('exit', worker => {
        console.log('cluster %d desconectado',worker.process.pid);
        cluster.fork();
    });

}else {
    console.log('thread slave');
    require('./index.js');
}
