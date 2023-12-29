"use server";

import prisma from "@/libs/prismadb";
import getUserByID from "../get/get-user-by-id";
import getCurrentUser from "../get/get-current-user";

interface Props {
    confirmuserId : string;
    currentUserId : string;
}

export default async function confirmFriendRequest({currentUserId , confirmuserId} : Props) {

    try {

        const targetUser = await getUserByID({id : confirmuserId}).then(res => res);

        if(targetUser){

            // sender update
            const targetuser_friends = targetUser.friends;
            if(!targetuser_friends.includes(currentUserId)){
                targetuser_friends.push(currentUserId);
                
            }
            
            const currentuser = await getUserByID({id : currentUserId}).then(res => res);

            if(currentuser && currentuser.reciveRequests.includes(confirmuserId)){
                const reciveRequests = currentuser.reciveRequests
                .filter(id => id !== confirmuserId)

                await prisma.user.update({
                    where : {id : currentUserId},
                    data : { reciveRequests }
                })
            }

            if(currentuser && currentuser.sendedRequests.includes(confirmuserId)){
                const sendedRequests = currentuser.sendedRequests
                .filter(id => id !== confirmuserId);
                
                await prisma.user.update({
                    where : {id : currentUserId},
                    data : { sendedRequests }
                })
            }


            if(targetUser.reciveRequests.includes(currentUserId)){
                const reciveRequests = targetUser.reciveRequests
                .filter(id => id !== currentUserId)

                await prisma.user.update({
                    where : {id : confirmuserId},
                    data : { reciveRequests }
                })
            }

            if(targetUser.sendedRequests.includes(currentUserId)){
                const sendedRequests = targetUser.sendedRequests
                .filter(id => id !== currentUserId)

                await prisma.user.update({
                    where : {id : confirmuserId},
                    data : { sendedRequests }
                })
            }



            await prisma.user.update({
                where : { id : confirmuserId},
                data : { friends : targetuser_friends}
            })


            // reciver update ( current user )
            const reciveruserData = await getUserByID({id : currentUserId}).then(res => res);
            
            if(reciveruserData){
                const reciveruserData_friendsArray = reciveruserData.friends
                if(!reciveruserData_friendsArray.includes(confirmuserId)){
                    reciveruserData_friendsArray.push(confirmuserId);
                }
                

                await prisma.user.update({
                    where : {id : currentUserId},
                    data : {friends : reciveruserData_friendsArray}
                }).then( res => {
                    return "CONFIRMED"
                })
            }

        }

    } catch (error) {
        return null;
    }

}