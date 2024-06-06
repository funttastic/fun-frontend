import React from 'react';

function Tutorial() {
  return (
    <div className="size-full flex flex-col">
      <iframe
        title="Hummingbot Installation Guide"
        src={"https://funttastic.github.io/static/partners/kujira/bot/index.html"}
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          overflow: 'auto',
        }}
      ></iframe>
    </div>
  );
}

export default Tutorial;
