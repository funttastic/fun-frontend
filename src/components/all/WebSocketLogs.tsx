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
            socket.send(id);
        };

        socket.onmessage = (event) => {
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
                {messages.map((message, id) => (
                    <li key={id}>Message: {message}</li>
                ))}
            </ul>
        </div>
    );
};

export default WebSocketLogs;
