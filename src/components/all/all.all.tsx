import React, { useEffect, useState } from 'react';

const AllComponent: React.FC = () => {
    const [messages, setMessages] = useState<string[]>([]);

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:30001/ws/log');
        console.log(socket)

        socket.onopen = () => {
            console.log('Conexão estabelecida com o servidor WebSocket.');
            socket.send('all.all');
        };

        socket.onmessage = (event) => {
            const data: string = event.data;
            setMessages(prevMessages => [...prevMessages, data]);
        };

        socket.onerror = (error) => {
            console.error('Ocorreu um erro na conexão WebSocket:', error);
        };

        socket.onclose = () => {
            console.log('Conexão WebSocket fechada.');
        };

        return () => {
            socket.close();
        };
    }, []);

    return (
        <div>
            <ul>
                {messages.map((message, index) => (
                    <li key={index}>Message: {message}</li>
                ))}
            </ul>
        </div>
    );
};

export default AllComponent;
