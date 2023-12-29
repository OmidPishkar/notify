"use server"

import prisma from "@/libs/prismadb";

interface Props {
    id : string;
}

export default async function getUserByID({
    id
}: Props) {

    try {

            const targetUser =  await prisma.user.findUnique({
                where : {
                    id
                }
            })
            .then( res => res);


            if(!targetUser){
                return null;
            } 

            return targetUser;

    } catch (error) {
        return null;
    }


}