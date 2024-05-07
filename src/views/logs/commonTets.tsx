import { Card } from "@/components/ui";
import CardFooter from "@/views/components/CardFooter";
import CardHeader from "../components/CardHeader";
import React from "react";
import WebSocketLogs from "@/components/websocketLogs/WebSocketLogs";


interface CommonProps {
  id: string;
  name: string;
}

const Common: React.FC<CommonProps> = ({ id, name }) => {
  return (
    <Card header={<div className="text-center font-bold py-3 text-gray-100"><h4>{name}</h4></div>} className="w-full h-[300px] col-span-12 sm:col-span-7">
      {/*<CardHeader className="absolute z-10 top-1 flex-col items-start">*/}
      {/*</CardHeader>*/}
      <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
        <div className="flex flex-grow gap-2 items-center">
          <div className="flex flex-col">
            <WebSocketLogs id={id} />
          </div>
        </div>
      </CardFooter>
    </Card>
    );
};