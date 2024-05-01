import React from 'react';
import classNames from 'classnames'
import {Card} from "@/components/ui";
import WebSocketLogs from "@/components/websocketLogs/WebSocketLogs";

interface CommonProps {
  id: string;
  name: string;
}

const Common = ({id, name}: CommonProps) => {

  return (

    <Card header={<div className="text-center font-bold flex flex-col py-2 " style={{color: '#f3f4f6'}}><h4>{name}</h4></div>}>
      <div className="max-h-96 overflow-y-auto ">
        <WebSocketLogs id={id}/>
      </div>
    </Card>

  );
}

export default Common;
