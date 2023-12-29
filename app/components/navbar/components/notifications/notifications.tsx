"use client";

import getCurrentUser from "@/actions/get/get-current-user";
import { useState , useEffect } from "react"
import { SafeUser } from "@/types";
import CleanNotif from "./clean-notification";
import NotifItem from "./notif-item";


const Notifications = () => {

    const [currentuser , setCurrentuser] = useState<SafeUser | null>(null);

    useEffect ( () => {

        const getUser = async () => {

            const user = await getCurrentUser().then(res => res);

            setCurrentuser(user);
        }

        getUser();

    } , [currentuser === null]);

    if(!currentuser){
        return (
            <p>please wait...</p>
        )
    }

    if(!currentuser.reciveRequests[0]){
        return (
            <CleanNotif/>
        )
    }

    const sendersRequestId = currentuser.reciveRequests
    return (
        <div>

            <h1 className="text-[1.4rem] text-white font-bold animate-fade mb-8">
                Notifications
            </h1>

            {sendersRequestId.map( senderId => {
                return (
                    <NotifItem
                        key={`${senderId}${Math.random}`}
                        currentuserId={currentuser.id}
                        senderRequestId={senderId}
                    />
                )
            })}
        </div>
    )
}

export default Notifications