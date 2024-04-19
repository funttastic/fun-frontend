import React, { useEffect, useState } from 'react';

interface WebSocketLogsProps {
    id: string;
}


const WebSocketLogs: React.FC<WebSocketLogsProps> = ({id}) => {
    const [messages, setMessages] = useState<string[]>([]);

    useEffect(() => {

        // if (!id) {
        //     console.error('A propriedade "id" é obrigatória para o componente WebSocketLogs.');
        //     return;
        // }

        const socket = new WebSocket('ws://localhost:30001/ws/log');
        console.log(socket)

        socket.onopen = () => {
            console.log('Connection established with the WebSocket server.');
            console.log(id)
            socket.send(id);
        };

        socket.onmessage = (event) => {
            console.log("Received message:", event.data);
            const data: string = event.data;
            setMessages(prevMessages => [...prevMessages, data]);

        };

        socket.onerror = (error) => {
            console.error('An error occurred in the WebSocket connection:', error);
        };

        socket.onclose = () => {
            console.log('WebSocket connection closed.');
        };

        return () => {
            socket.close();
        };
    }, [id]);

    return (
        <div>
            <ul>
                {messages.map((message,index) => (
                    <li key={index}>Message: {message}</li>
                ))}
            </ul>
        </div>
    );
};

export default WebSocketLogs;
