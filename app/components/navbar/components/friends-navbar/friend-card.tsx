"use client";

import BlockFriend from "@/actions/friend-request/block-friend";
import getUserByID from "@/actions/get/get-user-by-id";
import Avatar from "@/app/components/avatar";
import { SafeUser } from "@/types";
import clsx from "clsx";
import { MoreVertical, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

interface Props {
    friendId : string;
    currentuserId : string;
}


const FriendCard : React.FC<Props> = ({currentuserId , friendId}) => {
    const [friendData , setFriendData] = useState<SafeUser | null>(null);
    const [showMore , setshowMore] = useState(false);

    useEffect( () => {

        const getUser = async () => {
            const user = await getUserByID({id : friendId }).then(res => res);

            setFriendData(user)
        }

        getUser();

    } , [])

    if(!friendData){
        return (
            <SkeletonTheme baseColor="#202020" highlightColor="#444">
                <Skeleton count={1} height={88} className="rounded-xl w-full my-4"/>
            </SkeletonTheme>
        )
    }

    const handleBlockUser = async () => {
        await BlockFriend({currentuserId : currentuserId , targetUserId : friendId})
        .then( result => {
            if(result){
                toast.success("user is blocked , but can send request for you");
            }
        })
    }

    return (
        <div 
            className={clsx(
                `h-[88px] animate-fade-left relative py-5 px-6 bg-[#16191c] 
                rounded-xl my-4 flex items-center justify-between`,
                showMore ? "mb-[130px] transition-all" : "mb-4 transition-all"
            )}
        >
            <div className="flex items-center gap-4">
                {!friendData.profileImage && (
                    <Avatar/>
                )}
                {friendData.profileImage && (
                    <Image
                        src={friendData.profileImage}
                        width={44}
                        height={44}
                        alt={friendData.username}
                        className="rounded-full w-[44px] h-[44px] overflow-hidden"
                    />
                )}

                <div className="h-[50px] flex flex-col justify-between">
                    <p className="text-white font-semibold">{friendData.username}</p>
                    <p className="text-xs font-medium animate-pulse">online right now</p>
                </div>
            </div>


            <button
                onClick={() => setshowMore(true)}
                className="cursor-pointer p-3"
            >
                <MoreVertical size={18}/>
            </button>

            {showMore && (
                <div
                    className="bg-[#202428] animate-fade-up w-[160px] h-max p-2 absolute z-50 right-3 -bottom-24 rounded-xl"
                >
                    <X onClick={() => setshowMore(false)} size={17} className="text-rose-300 cursor-pointer ml-auto mr-2 mt-2"/>
                    
                    <button className="mt-5 mb-2 p-3 text-[#a7a6a8] hover:bg-[#2e3439] rounded-lg transition-all w-full text-left">
                        New Message
                    </button>

                    <button
                        onClick={() => handleBlockUser()}
                        className="p-3 text-rose-600 w-full text-left hover:bg-[#2e3439] rounded-lg transition-all"
                    >
                        Block User
                    </button>

                </div>
            )}
        </div>
    )
}

export default FriendCard