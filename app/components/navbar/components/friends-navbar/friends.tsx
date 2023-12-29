"use client";

import getCurrentUser from "@/actions/get/get-current-user";
import { useEffect, useState } from "react";
import { SafeUser } from "@/types";
import { Search, UserPlusIcon, UsersIcon } from "lucide-react";
import useFriendsModal from "@/hooks/use-friend-modal";
import AddFriend from "@/app/components/modals/add-friend";
import FriendCard from "./friend-card";
import getUserByID from "@/actions/get/get-user-by-id";

const Friends = () => {
    const { onOpen, isOpen } = useFriendsModal();
    const [currentUser, setCurrentUser] = useState<SafeUser | null>(null);
    const [searchedFriends , setsearchFriends] = useState<SafeUser[]>([])

    useEffect(() => {

        if (currentUser === null) {

            const getUser = async () => {
                const currentUser = await getCurrentUser()
                    .then(result => result);
                setCurrentUser(currentUser);
            }

            getUser();
        }

    }, [currentUser === null , searchedFriends]);

    if(!currentUser){
        return;
    }


    return (
        <div className="pb-10">

            {isOpen && (
                <AddFriend currentUser={currentUser}/>
            )}

            

            {!isOpen && (
                <>
                    {/* title of this navigation bar */}
                    <h1 className="text-[1.4rem] text-white font-bold animate-fade">
                        Friends
                    </h1>   

                    <div
                        onClick={() => onOpen()}
                        className="bg-[#2787f5] px-5 py-4 flex justify-between transition-all
                        items-center rounded-xl text-white cursor-pointer hover:bg-[#2174d3]
                        text-[0.9375rem] mt-4 animate-fade"
                    >
                        <p className="font-medium">Add new friend</p>
                        <UserPlusIcon size={18} />
                    </div>
                </>
            )}

            {!currentUser.friends[0] && (
                <p className="w-[200px] text-center mx-auto mt-10 text-blue-300">you are alone but you can add new friend</p>
            )}

            <div className="mt-16">

                {currentUser.friends[0] && ( 
                    <p className="text-xs flex items-center justify-center gap-2 capitalize text-center text-blue-300 font-medium">
                        your friends<UsersIcon size={15}/>
                    </p>
                )}

                {!searchedFriends[0] && currentUser.friends.map(friendId => {
                    return (
                        <FriendCard
                            currentuserId={currentUser.id}
                            key={friendId}
                            friendId={friendId}
                        />
                    )
                })}

                {searchedFriends[0] && searchedFriends.map(friend => {
                    return (
                        <FriendCard
                            currentuserId={currentUser.id}
                            key={friend.id}
                            friendId={friend.id}
                        />
                    )
                })}
            </div>
        </div>
    );
}

export default Friends