
import { SafeUser } from "@/types"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"

// import accordions
import ProfileAccordion from "./profile-accordion/profile-accordion"
import ConnectedAccountsAccordion from "./accounts-accordion/connected-accounts-accordion"
import PasswordAccordion from "./password-accordion/password-accordion"


interface Props {
    currentUser : SafeUser | null
}

const AccountAccordion : React.FC<Props> = ({currentUser}) => {
    
    if(currentUser === null){
        return (
            <div
                className="w-full mt-5 rounded-lg py-5"
            >
                <h1 className="text-left text-[#757476] text-[0.875rem] font-medium mb-7">
                    Account
                </h1>

                <SkeletonTheme baseColor="#202020" highlightColor="#444">
                    <Skeleton count={2} height={60} className="w-full flex-1" />
                </SkeletonTheme>

                <h1 className="text-left text-[#757476] text-[0.875rem] font-medium my-7">
                    Password
                </h1>

                <SkeletonTheme baseColor="#202020" highlightColor="#444">
                    <Skeleton count={1} height={60} className="w-full flex-1" />
                </SkeletonTheme>
            </div>
        )
    }
    
    return (
        <div
        className="w-full flex flex-col items-start gap-6 h-max   mt-5 "
        >
            <h1 className="text-left text-[#757476] text-[0.875rem] font-medium">
                Account
            </h1>

            <div
                className="w-full px-6 py-1 bg-[#16191c] rounded-xl"
            >

                {/* accordion for change profile setting */}
                <ProfileAccordion currentUser={currentUser}/>
                <ConnectedAccountsAccordion currentUser={currentUser}/>
            </div>

            <h1 className="text-left text-[#757476] text-[0.875rem] font-medium">
                Password
            </h1>

            <div
                className="w-full px-6 py-1 bg-[#16191c] rounded-xl"
            >

                {/* accordion for change password */}
                <PasswordAccordion currentUser={currentUser}/>
            </div>

        </div>
    )
}

export default AccountAccordion