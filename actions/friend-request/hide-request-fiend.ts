"use server";

import prisma from "@/libs/prismadb";
import getUserByID from "../get/get-user-by-id";

interface Props {
    hideuserId : string;
    currentUserId : string;
}

export default async function hideFriendRequest({currentUserId , hideuserId} : Props) {

    try {

        const hideuserData = await getUserByID({id : hideuserId}).then(res => res);

        if(hideuserData){

            // sender update
            const hideuserData_sendedrequests = hideuserData.sendedRequests;

            const finally_sendedArray = hideuserData_sendedrequests.filter(id => id !== currentUserId);

            await prisma.user.update({
                where : { id : hideuserId},
                data : { sendedRequests : finally_sendedArray}
            })


            // reciver update ( current user )
            const reciveruserData = await getUserByID({id : currentUserId}).then(res => res);
            
            if(reciveruserData){
                const reciveruserData_recivedRequests = reciveruserData.reciveRequests
                const finally_recivedArray = reciveruserData_recivedRequests.filter(id => id !== hideuserId);
                

                await prisma.user.update({
                    where : {id : currentUserId},
                    data : {reciveRequests : finally_recivedArray}
                }).then( res => {
                    return "HIDED"
                })
            }

        }

    } catch (error) {
        return null;
    }

}