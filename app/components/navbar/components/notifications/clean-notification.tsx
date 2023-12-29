import { Search, SearchX } from "lucide-react"

const CleanNotif = () => {
    return (
        <div
            className="w-full h-full flex items-center justify-center"
        >
            <div className="flex flex-col items-center gap-4">
                <Search size={24}/>
                <p className="font-medium text-sm">Dont find new notification for you</p>
            </div>
        </div>
    )
}

export default CleanNotif