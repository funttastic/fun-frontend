import React from 'react';

function Tutorial() {
  return (
    <div className="size-full overflow-hidden border-none no-scrollbar flex flex-col py-6">
      <iframe
        title="Kujira Connector for Hummingbot (Video Demonstration)"
        src={"https://funttastic.github.io/static/partners/kujira/bot/index.html"}
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

export default Tutorial;
