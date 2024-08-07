import React from 'react';
import IFrame from '@/components/utils/IFrame';

// const filebrowserRestProtocol = import.meta.env.VITE_FILEBROWSER_REST_PROTOCOL;
// const filebrowserBaseUrlPrefix = import.meta.env.VITE_FILEBROWSER_BASE_URL_PREFIX;

const Files: React.FC = () => {
  return (
    <div className="size-full overflow-hidden border-none no-scrollbar">
      <IFrame
        title={'Funttastic'}
        src={`/filebrowser`}
        // src={`${filebrowserRestProtocol}://${filebrowserBaseUrlPrefix}/filebrowser`}
      />
    </div>
  );
}

export default Files;
