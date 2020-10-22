  
import { Manager } from "socket.io-client";
import 'dotenv/config';
const manager = new Manager("ws://localhost:8080", {});
const socket = manager.socket("/");

// @ts-ignore
socket.on("connect", () => {
    console.log(`connect ${socket.id}`);
});

// @ts-ignore
socket.on("disconnect", () => {
    console.log(`disconnect`);
});

socket.on("retorno",(data)=>{
    console.log(data);
})

// socket.emit("oi", {host: "", username: "",password: ''});

setInterval(() => {
    socket.emit("oi", {
        host: process.env.HOST, 
        username: process.env.USER,
        password: process.env.PASS, 
        command: 'show run interface Ethernet1/24'}
        );
}, 3000);