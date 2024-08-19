import React, {useEffect, useRef, useState} from 'react';



interface WebSocketLogsProps {
    id: string;
}

const WebSocketLogs: React.FC<WebSocketLogsProps> = ({id}) => {
    const [messages, setMessages] = useState<string[]>([]);
    const socketRef = useRef<WebSocket | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isUserAtBottom, setIsUserAtBottom] = useState(true);
    useEffect(() => {
        const websocketURL = `/api/ws/log`;
        const socket = new WebSocket(websocketURL);
        socketRef.current = socket;
        console.log(socket)

        socket.onopen = () => {
            console.log('ID', id);
            console.log('Connection established with the WebSocket server.');
            socket.send(id);
        };

        socket.onmessage = (event) => {
            console.log(event.data);
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
            if (socketRef.current) {
                socketRef.current.close();
            }
        };
    }, [id]);

    return (
      <MessageList messages={messages} />
    );
};

interface MessageListProps {
    messages: string[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isUserAtBottom, setIsUserAtBottom] = useState(true);

    useEffect(() => {
        const scrollDiv = scrollRef.current;

        const handleScroll = () => {
            if (scrollDiv) {
                const isAtBottom = scrollDiv.scrollHeight - scrollDiv.scrollTop === scrollDiv.clientHeight;
                setIsUserAtBottom(isAtBottom);
            }
        };

        if (scrollDiv) {
            scrollDiv.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (scrollDiv) {
                scrollDiv.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    useEffect(() => {
        const scrollDiv = scrollRef.current;
        if (isUserAtBottom && scrollDiv) {
            scrollDiv.scrollTop = scrollDiv.scrollHeight;
        }
    }, [messages, isUserAtBottom]);


    return (
      <div ref={scrollRef} style={{ height: '400px', overflowY: 'auto' }}>
          <ul>
              {messages.map((message,id) => (
                <li key={id}>{message}</li>
              ))}
          </ul>
      </div>
    );
};

export default WebSocketLogs;
