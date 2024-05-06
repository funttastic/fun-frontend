import React, { useRef, useEffect } from 'react';
import { Card } from "@/components/ui";
import WebSocketLogs from "@/components/websocketLogs/WebSocketLogs";

interface CommonProps {
  id: string;
  name: string;
}

const Common: React.FC<CommonProps> = ({ id, name }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  // Função para rolar para o final do conteúdo
  const scrollToBottom = () => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  };

  // Chamada de scrollToBottom sempre que houver uma atualização no conteúdo
  useEffect(() => {
    scrollToBottom();
  }, [id]); // Coloque aqui as dependências que causam a atualização do conteúdo

  return (
    <Card
      header={<div className="text-center font-bold py-3 text-gray-100"><h4>{name}</h4></div>}
      bodyClass="max-h-96 overflow-y-auto"
    >
      <div ref={contentRef} className="content-container">
        <WebSocketLogs id={id} />
      </div>
    </Card>
  );
}

export default Common;
