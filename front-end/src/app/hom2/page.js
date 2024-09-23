"use client"
import Button from "../components/button";
import { useEffect, useState } from "react";
import { useSocket } from "../hooks/useSocket"


export default function PruebaWS() {
    const {socket, isConnected} = useSocket();
    const [message, setMessage] = useState("");


    useEffect(() => {
        //si el socket no existe, se va de la función 
        if (!socket) return;

        socket.on("pingAll", (data) => {
            console.log("me llego el evento pingAll", data);

        });   
        socket.on("newMessage", (data) => {
            console.log("Mensaje de la sala: ", data);
        });

    }, [socket, isConnected]);

    function handleClick() {
        socket.emit("pingAll", { message: "hola" });
    }
        function handleJoinChat() {
        socket.emit("joinRoom", {room: "sol"});
    }
    function handleSendMessage() {
        socket.emit("sendMessage", {mensaje: message});
    } 

    return (
        <div>
            <Button onClick={handleClick} text="a" />
            <Button onClick={handleJoinChat} text="conectarse" />
            <label for="name">unirse:</label>
            <input onChange={(event) => setMessage(event.target.value)}/>
            <Button onClick={handleSendMessage} text="enviar" />
        </div>
    );
}
