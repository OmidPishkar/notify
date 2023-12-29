import { SafeUser } from "@/types"
import clsx from "clsx"
import { ChevronRight } from "lucide-react"
import { useState } from "react"
import AccountsForm from "./accounts-form"

interface Props {
    currentUser : SafeUser
}


interface Props {
    currentUser: SafeUser
}

const ConnectedAccountsAccordion: React.FC<Props> = ({ currentUser }) => {
    const [showContent , setShowContent] = useState(false)

    return (
        <div
            className="w-full rounded-t-xl animate-flip-down animate-normal"
        >
            <div
                onClick={() => showContent ? setShowContent(false) : setShowContent(true)}
                className={clsx(
                    "flex items-center justify-between pb-2 pt-4 cursor-pointer border-[#1e2126]",
                    showContent ? "border-b" : "border-none"
                )}
            >
                <div>
                    <h3 className={clsx(
                        "text-white tracking-wider text-[1rem] transition-all",
                        showContent ? "font-bold" : "font-normal"
                    )}>
                        Connected Accounts
                    </h3>
                    <p className="text-[0.8375rem] tracking-wide text-[#a7a6a8] ">
                        Connect with your accounts
                    </p>
                </div>

                <ChevronRight size={16} className={clsx("transition-all", showContent ? "rotate-90" : "")} />
            </div>

            <div
                className={clsx(
                    `transition-all overflow-hidden scroll-smooth `,
                    showContent ? "h-max py-3" : "h-0"
                )}
            >
                <AccountsForm
                    twitter={currentUser.twitterAccount}
                    instagram={currentUser.instagramAccount}
                    facebook={currentUser.facebookAccount}
                    userId={currentUser.id}
                />
            </div>
        </div>
    )
}

export default ConnectedAccountsAccordion