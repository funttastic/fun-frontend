
import React from 'react';
import IFrame from '@/components/utils/IFrame';
import Wizard from './wizard';

const filebrowserPort = import.meta.env.VITE_FILEBROWSER_PORT || '50002';

const Files: React.FC = () => {
  return (
    <div className="size-full overflow-hidden border-none no-scrollbar">
      <IFrame
        title={'Funttastic'}
        src={`http://localhost:${filebrowserPort}/files/`}
      />
      <Wizard />
    </div>
  );
}

export default Files;
