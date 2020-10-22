  
import { Server } from "socket.io";
import { Client} from 'ssh2';

const io = new Server(8080);
const ssh = new Client();  
io.on("connect", (socket) => {
    console.log(`connect ${socket.id}`);
    socket.on("oi", ({host, username,password,command }) => {
             
          ssh.on('ready', function() {
            console.log('Client :: ready');
            ssh.exec(command, function(err, stream) {
              if (err) throw err; 
              stream.on('close', function(code, signal) {
                console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
                ssh.end();
              }).on('data', function(data) {
                console.log('STDOUT: ' + data);
              }).stderr.on('data', function(data) {
                console.log('STDERR: ' + data);
              });
            });
          }).connect({
            host,
            port: 22,
            username,
            password
          });
    });

    socket.on("disconnect", () => {
        console.log(`disconnect ${socket.id}`);
    });
});