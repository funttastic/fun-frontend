
import React from 'react';

function TelegramBot() {
  return (
    <div className="size-full overflow-hidden border-none no-scrollbar">
      <iframe
        title="Kujira Connector for Hummingbot (Video Demonstration)"
        src={"https://hummingbot.org/installation/docker/"}
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          overflow: 'hidden',
        }}
      ></iframe>
    </div>
  );
}

export default TelegramBot;
