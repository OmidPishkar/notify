"use server"

import prisma from "@/libs/prismadb";
import { getServerSession } from "next-auth";

interface Props {
    userEmail : string | undefined
}

export default async function getUserByEmail({
    userEmail
}: Props) {

    try {

        if (userEmail) {

            const serverSession = await getServerSession();
            
            
            if( serverSession?.user?.email == userEmail ){
                return undefined
            }

            const targetUser =  await prisma.user.findUnique({
                where : {
                    email : userEmail
                }
            })
            .then( res => res);


            if(!targetUser){
                return undefined;
            } 

            return targetUser;
        }

    } catch (error) {
        return null;
    }


}