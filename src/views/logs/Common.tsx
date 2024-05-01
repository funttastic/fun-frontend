import React from 'react';
import {Card} from "@/components/ui";
import WebSocketLogs from "@/components/websocketLogs/WebSocketLogs";

interface CommonProps {
  id: string;
  name: string;
}

const Common: React.FC<CommonProps> = ({ id, name }) => {
  return (
    <Card
      header={<div className="text-center font-bold py-3 text-gray-100"><h4>{name}</h4></div>}
      bodyClass="text-center max-h-96 overflow-y-auto scroll-smooth"
    >
      <WebSocketLogs id={id} />
    </Card>
  );
}

export default Common;
