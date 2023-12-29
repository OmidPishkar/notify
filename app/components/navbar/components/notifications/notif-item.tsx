"use client";

import getUserByID from "@/actions/get/get-user-by-id";
import hideFriendRequest from "@/actions/friend-request/hide-request-fiend";
import Avatar from "@/app/components/avatar";
import { SafeUser } from "@/types";
import clsx from "clsx";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import confirmFriendRequest from "@/actions/friend-request/confirm-request-fiend";
import { SmileIcon } from "lucide-react";

interface Props {
    currentuserId : string;
    senderRequestId : string;
}

const NotifItem : React.FC<Props> = ({currentuserId , senderRequestId}) => {
    const [ senderData , setSenderdata ] = useState<SafeUser | null>(null);
    const [hide , setHide] = useState(false);

    useEffect( () => {

        const getsenderUser = async () => {
            const user = await getUserByID({id : senderRequestId}).then(res => res);
            setSenderdata(user)
        }

        getsenderUser();

    } , [senderData === null]);

    if(!senderData){
        return (
            <SkeletonTheme baseColor="#202020" highlightColor="#444">
                <Skeleton count={1} height={44} className="rounded-xl w-full mb-5"/>
            </SkeletonTheme>
        )
    }

    const handleHide = async () => {
        await hideFriendRequest({
            currentUserId : currentuserId , 
            hideuserId : senderRequestId,
        })
        .then( () => {
            toast.success("removed");
            setTimeout(() => {
                setHide(true);
            }, 1000);
        })
    };


    const handleConfirm = async () => {
        await confirmFriendRequest({
            currentUserId : currentuserId , 
            confirmuserId : senderRequestId,
        })
        .then( () => {
            toast.success("you have new friend" , {
                icon: <SmileIcon className="text-green-500"/>
            });
            setTimeout(() => {
                setHide(true);
            }, 1000);
        })
    };
    
    return (
        <div
            className={clsx(
                "w-full h-[150px] mb-4 bg-[#16191c] px-6 pt-5 pb-3 rounded-xl",
                hide ? "hidden transition-all" : "animate-fade-up"
            )}
        >
            <div
                className="border-b border-[#1e2126] pb-5 flex items-center "
            >
                {!senderData.profileImage && (
                    <Avatar/>
                )}
                {senderData.profileImage && (
                    <Image
                        src={senderData.profileImage}
                        alt={senderData.username}
                        width={44}
                        height={44}
                        className="rounded-full"
                    />
                )}

                <div
                    className=" h-full pl-4 pr-2 flex flex-col"
                >
                    <p className="text-sm font-semibold text-white mb-4">{senderData.username}</p>
                    <p className="text-xs font-medium">Send you a friend request.</p>
                </div>
            </div>

            <div
                className="pt-3 flex items-center justify-between gap-3"
            >
                <button
                    onClick={() => handleHide()}
                    className="text-[#2787f5] text-sm bg-[#192a3d] w-full px-3 rounded-md 
                    h-[35px] animate-fade-right hover:bg-[#192a3d]/70 transition-all font-medium"
                >
                    Hide
                </button>

                <button
                    onClick={() => handleConfirm()}
                    className="text-white text-sm bg-[#2787f5] w-full px-3 rounded-md
                    h-[35px] animate-fade-left hover:bg-[#2787f5]/70 transition-all font-medium"
                >
                    Confirm
                </button>
            </div>
        </div>
    )
}

export default NotifItem;