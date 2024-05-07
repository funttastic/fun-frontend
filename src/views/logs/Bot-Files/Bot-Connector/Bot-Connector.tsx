import React from 'react';

function BotConnector() {
  return (
    <div className="size-full overflow-hidden border-none no-scrollbar">
      <iframe width="560" height="315" src="https://www.youtube.com/embed/3wVcoOpdwus?si=bBg97HMsd3Ykf0Dw"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin" allowFullScreen
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

export default BotConnector;
