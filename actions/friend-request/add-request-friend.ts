"use server"

import prisma from "@/libs/prismadb";
import { SafeUser } from "@/types";
import getUserByID from "../get/get-user-by-id";

interface Props {
    currentuserId: string | undefined;
    targetUser: SafeUser | null | undefined;
}

export default async function addRequestFriend({
    currentuserId, targetUser
}: Props) {

    try {

        if (currentuserId && targetUser) {

            
            const currentUser = await getUserByID({id : currentuserId}).then(res => res);


            // push senderId in targetUser.reciveRequests
            // const reciveRequests = targetUser.reciveRequests;

            if(
                targetUser.reciveRequests.includes(currentuserId) && currentUser?.sendedRequests.includes(targetUser.id) 
                ||
                targetUser.sendedRequests.includes(currentuserId) && currentUser?.reciveRequests.includes(targetUser.id) 
                
            ){
                return "already been sent"
            } else {

                const targetuser_Arr = targetUser.reciveRequests
                targetuser_Arr.push(currentuserId);

                // update reciveRequest array in target user data in db
                await prisma.user.update({
                    where: { id: targetUser.id },
                    data: { reciveRequests : targetuser_Arr }
                })
    
                // --------------------CHECK SENDER DATA FOR SEND REQUEST-----------------------
    
    
                // get sender user for push in sendedRequests array
                const currentUser = await prisma.user.findFirst({ where: { id: currentuserId } })
                    .then(res => res);
    
                if (currentUser) {
                    // push sendedRequest array
                    const sendedRequests = currentUser.sendedRequests
    
                    sendedRequests.push(targetUser.id);
    
                    // update sendedRequest array in sender user data in db
                    await prisma.user.update({
                        where: { id: currentuserId },
                        data: { sendedRequests }
                    })
    
    
                    return "DID IT";
                }

            }


        }


    } catch (error) {
        return null;
    }


}