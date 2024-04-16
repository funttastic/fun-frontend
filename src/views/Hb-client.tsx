import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Card } from "@/components/ui";
import WebSocketLogs from "@/components/all/WebSocketLogs";

const HbClient = () => {
  const [uniqueId, setUniqueId] = useState('');

  useEffect(() => {
    const id = uuidv4();
    setUniqueId(id);
  }, []);

  return (
    <div className="flex flex-col py-6">
      <Card header={<div className="text-center font-bold" style={{color: '#f3f4f6'}}><h4>Hb-Client</h4></div>}>
        {uniqueId && <WebSocketLogs id={uniqueId}/>}
      </Card>
    </div>
  );
}

export default HbClient;
