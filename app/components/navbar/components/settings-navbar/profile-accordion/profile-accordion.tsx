import { SafeUser } from "@/types"
import clsx from "clsx"
import { ChevronRight } from "lucide-react"
import { useState } from "react"
import FormProfileAccordion from "./form-profile-accordion"

interface Props {
    currentUser : SafeUser
}

const ProfileAccordion : React.FC<Props> = ({currentUser}) => {
    const [showContent , setShowContent] = useState(false)
    return (
        <div
            className="w-full rounded-t-xl animate-flip-up animate-normal"
        >
            <div
                onClick={() => showContent ? setShowContent(false) : setShowContent(true)} 
                className="flex items-center justify-between pb-2 pt-4 cursor-pointer border-b border-[#1e2126]"
            >
                <div>
                    <h3 className={clsx(
                        "text-white tracking-wider text-[1rem] transition-all",
                        showContent ? "font-bold": "font-normal"
                    )}>
                        Profile Settings
                    </h3>
                    <p className="text-[0.8375rem] tracking-wide text-[#a7a6a8] ">
                        Change your profile settings
                    </p>
                </div>

                <ChevronRight size={16} className={clsx("transition-all" , showContent ? "rotate-90" : "")}/>
            </div>

            <div 
                className={clsx(
                    `transition-all overflow-hidden scroll-smooth border-b border-[#1e2126]` , 
                    showContent ? "h-max py-3" : "h-0"
                )}
            >
                <FormProfileAccordion 
                    username={currentUser.username}
                    bio={currentUser.bio}
                    phoneNumber={currentUser.phoneNumber}
                    userId={currentUser.id}
                />
            </div>
        </div>
    )
}

export default ProfileAccordion