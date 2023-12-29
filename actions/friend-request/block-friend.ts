"use server";

import getUserByID from "../get/get-user-by-id";
import prisma from "@/libs/prismadb"


interface Props {
    currentuserId : string;
    targetUserId : string;
}



export default async function BlockFriend({currentuserId  ,  targetUserId} : Props){

    try {
        
        const currentuser = await getUserByID({id : currentuserId}).then( res => res);

        if(currentuser?.friends){
            const newCurrentuserFriends : string[] =
            currentuser.friends.filter(friend => friend !== targetUserId);

            await prisma.user.update({
                where : {id : currentuserId},
                data : {friends : newCurrentuserFriends}
            });
        };

        const targetUser = await getUserByID({id : targetUserId}).then(res => res);

        if(targetUser?.friends){
            const newTargetuserFriends : string[] =
            targetUser.friends.filter(friend => friend !== currentuserId);

            await prisma.user.update({
                where : {id : targetUserId},
                data : {friends : newTargetuserFriends}
            });

            return true;
        }

    } catch (error) {
        return null;
    }

}