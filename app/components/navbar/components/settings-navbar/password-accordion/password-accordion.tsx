import { useState } from "react";
import { SafeUser } from "@/types"
import clsx from "clsx";
import { ChevronRight } from "lucide-react"; 
import PasswordForm from "./password-form";


interface Props {
    currentUser: SafeUser;
}

const PasswordAccordion: React.FC<Props> = ({ currentUser }) => {
    const [showContent , setShowContent] = useState(false)
    return (
        <div
            className="w-full rounded-t-xl animate-flip-up animate-normal"
        >
            <div
                onClick={() => showContent ? setShowContent(false) : setShowContent(true)}
                className="flex items-center justify-between pb-2 pt-4 cursor-pointer "
            >
                <div>
                    <h3 className={clsx(
                        "text-white tracking-wider text-[1rem] transition-all",
                        showContent ? "font-bold" : "font-normal"
                    )}>
                        Password
                    </h3>
                    <p className="text-[0.8375rem] tracking-wide text-[#a7a6a8] ">
                        Change your Password
                    </p>
                </div>

                <ChevronRight size={16} className={clsx("transition-all", showContent ? "rotate-90" : "")} />
            </div>

            <div 
                className={clsx(
                    `transition-all overflow-hidden scroll-smooth  border-[#1e2126]` , 
                    showContent ? "h-max py-3 border-t" : "h-0"
                )}
            >   
                <p
                    className="text-blue-400 animate-pulse text-xs border border-blue-200 shadow-2xl py-1 px-4 text-center rounded-xl my-3"
                >
                    <span className="font-bold">After save new password</span><br/> you log out automaticlly and you must login again!
                </p>

                <PasswordForm userId={currentUser.id}/>
            </div>
            
        </div>
    )
}

export default PasswordAccordion