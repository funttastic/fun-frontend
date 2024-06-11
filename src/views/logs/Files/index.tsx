import Wizard from './Wizard';
import IFrame from '@/components/utils/IFrame'

const filebrowserPort = import.meta.env.VITE_FILEBROWSER_PORT || '50002';

export default function Files() {
    return (
        <div className="size-full overflow-hidden border-none no-scrollbar">
            <IFrame
                title={'Funttastic'}
                src={`http://localhost:${filebrowserPort}/files/`}
            ></IFrame>
          <Wizard/>
        </div>
    )
}
