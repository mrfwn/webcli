  
import { Server } from "socket.io";
import {NodeSSH}from 'node-ssh';

const io = new Server(8080);
const ssh = new NodeSSH();  
io.on("connect", (socket) => {
    console.log(`connect ${socket.id}`);
    socket.on("oi", ({host, username,password,command }) => {
        ssh.connect({
        host,
        username,
        password
        }).then(() => ssh.exec(command, [], {
            cwd: '',
            onStdout(chunk) {
                socket.emit("retorno",chunk.toString('utf8'));
            },
            onStderr(chunk) {
                socket.emit("retorno",chunk.toString('utf8'));
            },
          }));
        
    });

    socket.on("disconnect", () => {
        console.log(`disconnect ${socket.id}`);
    });
});