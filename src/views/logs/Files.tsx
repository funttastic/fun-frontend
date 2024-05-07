import IFrame from '@/components/utils/IFrame'

const filebrowserPort = import.meta.env.VITE_FILEBROWSER_PORT || '50000';

export default function Files() {
    return (
        <div className="size-full overflow-hidden border-none no-scrollbar">
            <IFrame
                title={'Funttastic'}
                src={`http://localhost:${filebrowserPort}/files/`}
            ></IFrame>
        </div>
    )
}
