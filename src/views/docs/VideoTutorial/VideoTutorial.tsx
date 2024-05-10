import React from 'react';

function VideoTutorial() {
  return (
    <div className="size-full overflow-hidden border-none no-scrollbar">
      <iframe width="560" height="315" src="https://www.youtube.com/embed/wKhGnbz3L7M?si=n0QhEbMeCr1pWg4Z"
              title="Video Tutorial"
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

export default VideoTutorial;




