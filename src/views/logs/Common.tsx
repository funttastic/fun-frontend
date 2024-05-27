import React from 'react';
import { Card } from "@/components/ui";
import WebSocketLogs from "@/components/websocketLogs/WebSocketLogs";

interface CommonProps {
  id: string;
  name: string;
}

const Common: React.FC<CommonProps> = ({ id, name }) => {

  return (
    <Card
      className="flex flex-col py-8"
      header={<div className="text-center font-bold py-3 text-gray-100"><h4>{name}</h4></div>}
    >
      <div>
        <WebSocketLogs id={id} />
      </div>
    </Card>
  );
}

export default Common;


