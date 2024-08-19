import React from 'react';
import IFrame from '@/components/utils/IFrame';

const Files: React.FC = () => {
  return (
    <div className="size-full overflow-hidden border-none no-scrollbar">
      <IFrame
        title={'Funttastic'}
        src={`/filebrowser`}
      />
    </div>
  );
}

export default Files;
