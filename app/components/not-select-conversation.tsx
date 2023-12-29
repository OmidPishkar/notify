import { MessageSquareMore } from "lucide-react";

const NotSelected = () => {
    return(
        <div className="w-full h-full flex flex-col items-center justify-center">
            <MessageSquareMore size={33} className="text-[#757476] mx-auto mb-3"/>
            <p
                className="text-[#757476] text-[0.9rem] text-center animate-pulse"
            >
                Pick a person from left menu,<br/>and start your conversation.
            </p>
        </div>
    )
}

export default NotSelected;