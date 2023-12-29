"use client";

import { useEffect, useState } from "react";
import LogoutCard from "./log-out-card"
import getCurrentUser from "@/actions/get/get-current-user";
import { SafeUser } from "@/types";
import AccountAccordion from "./account-accordion";

const SettingsNav = () => {
    const [currentUser , setCurrentUser] = useState<SafeUser | null>(null);
    
    useEffect( () => {
        if(currentUser === null){
            const getUser = async () => {
                const currentUser = await getCurrentUser()
                .then(result => result)
                setCurrentUser(currentUser);
            };
            getUser();
        }
    } , [currentUser === null])


    return (
        <div className="pb-10">
            
            {/* title of this navigation bar */}
            <h1 className="text-[1.4rem] text-white font-bold animate-fade">
                Settings
            </h1>
            
            {/* log out button and user information component */}
            <LogoutCard currentUser={currentUser}/>

            {/* Account Accordions */}
            <AccountAccordion currentUser={currentUser}/>


        </div>
    )
}

export default SettingsNav;