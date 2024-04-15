import React from 'react';
import {Card} from "@/components/ui";
import WebSocketLogs from "@/components/all/WebSocketLogs";

const FileBrowser = () =>
  <div className="flex flex-col py-6">
    <Card header={<div className="text-center font-bold" style={{color: '#f3f4f6'}}><h4>FileBrowser</h4></div>}>
      <WebSocketLogs/>
    </Card>
  </div>

export default FileBrowser