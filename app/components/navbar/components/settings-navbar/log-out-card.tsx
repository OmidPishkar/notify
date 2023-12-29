"use client";

import { useState } from "react";
import { SafeUser } from "@/types"
import Skeleton from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css'
import { SkeletonTheme } from "react-loading-skeleton"
import useNavigator from "@/hooks/use-active-navigation";
import Avatar from "@/app/components/avatar"
import { Image as ImageIcon, LogOut, X } from "lucide-react"
import Image from 'next/image'
import { signOut } from "next-auth/react"
import { UploadButton } from "@/libs/uploadthing";
import toast from "react-hot-toast";
import updateImage from "@/actions/update/update-image-user"
import clsx from "clsx";

interface Props {
    currentUser : SafeUser | null 
}

const LogoutCard : React.FC<Props> = ({currentUser}) => {
    const [avatar , setavatar] = useState(false);
    const {setActiveNav} = useNavigator()

    if(currentUser === null) {
        return (
            <div
                className="w-full mb-7 flex gap-6 h-[90px] bg-[#16191c] mt-5 rounded-lg px-6 py-5 shadow-2xl"
            >
                <div className="w-11 h-11 rounded-full overflow-hidden">
                    <SkeletonTheme baseColor="#202020" highlightColor="#444">
                        <Skeleton count={1} height={44} width={44} className="rounded-full"/>
                    </SkeletonTheme>
                </div>
                
                <div className="flex-1">
                    <SkeletonTheme baseColor="#202020" highlightColor="#444">
                        <Skeleton count={1} height={20} className="w-full flex-1" />
                        <Skeleton count={1} height={20} className="w-full flex-1" />
                    </SkeletonTheme>
                </div>
            </div>
        )
    }

    return (
        <div 
            className={clsx(
                `w-full animate-fade-right animate-normal mb-7 h-[90px] bg-[#16191c]
                mt-5 rounded-lg flex items-center justify-between overflow-hidden`,
                avatar ? "p-0" : "px-6 py-5"
            )}
        >
            {avatar && (
                <div className="w-full h-full flex bg-indigo-600/10 items-center justify-center relative animate-fade animate-once animate-normal">

                    <X
                        onClick={() => setavatar(false)}
                        className="absolute top-3 left-3 text-rose-400 cursor-pointer"
                    />

                    <UploadButton
                        endpoint="imageUploader"
                        className="w-full h-full"
                        onClientUploadComplete={(result) => {
                            const id = result[0].serverData.uploadedBy;
                            console.log('------------------------')
                            console.log(id)
                            console.log('------------------------')
                            const url = result[0].url

                            updateImage({
                                userId : id , 
                                imageUrl : url
                            });


                            toast.success("Profile updated!");
                            setavatar(false);
                        }}
                        onUploadError={(error : Error) => {
                            console.log('------------------------')
                            console.log(error.message)
                            console.log('------------------------')
                            toast.error("please try again")
                            setavatar(false);
                        }}
                    />
                </div>
            )}

            {!avatar && (
            <>    
            <div
                className="flex gap-2 pr-2 items-center"
            >
                {/* first container for user profile image */}
                <div 
                    className="w-[44px] h-[44px] overflow-hidden relative cursor-pointer hover:opacity-70 transition-all"
                    onClick={() => {setavatar(true)}}
                >
                    {!currentUser.profileImage && (
                        <Avatar/>
                    )}
                    {currentUser.profileImage && (
                        <Image
                            src={currentUser.profileImage}
                            alt={currentUser.username}
                            width={44}
                            height={44}
                            className="rounded-full"
                        />
                    )}
                    <ImageIcon 
                        size={20} 
                        className="
                            bg-gray-700 p-1 rounded-full absolute right-0 bottom-0
                        "
                    />
                </div>

                {/* second container for user email and user name */}
                <div>
                    <h4 className="text-[0.9rem] text-white font-semibold">{currentUser.username}</h4>
                    <p className="text-[#a7a6a8] text-[0.8rem] font-medium">{currentUser.email}</p>
                </div>
            </div>
                    
            
            <button 
                onClick={() => signOut()}
                className="hover:scale-75 transition-all"
            >
                <LogOut size={18} className="text-[#757476]"/>
            </button>
            </>
            )}
        </div>
    )
}

export default LogoutCard;