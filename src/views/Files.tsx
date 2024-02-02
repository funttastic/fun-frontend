import IFrame from '@/components/utils/IFrame'

export default function Files() {
    return (
        <div className="size-full overflow-hidden border-none no-scrollbar">
            <IFrame
                title={'Funttastic'}
                src={'http://localhost:8080/files/'}
            ></IFrame>
        </div>
    )
}
