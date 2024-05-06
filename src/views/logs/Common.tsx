import React, { useRef, useEffect } from 'react';
import { Card } from "@/components/ui";
import WebSocketLogs from "@/components/websocketLogs/WebSocketLogs";

interface CommonProps {
  id: string;
  name: string;
}

const Common: React.FC<CommonProps> = ({ id, name }) => {
  const contentRef = useRef<HTMLDivElement>(null);


  const scrollToBottom = () => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  };


  useEffect(() => {
    scrollToBottom();
  }, [id]);

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
