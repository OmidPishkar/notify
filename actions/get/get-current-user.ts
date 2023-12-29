"use server"

import { getServerSession } from "next-auth";
import prisma from "@/libs/prismadb"
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function getSession(){
    return await getServerSession(authOptions);
}

export default async function getCurrentUser () {
    try {
        const session = await getSession();

        if(!session?.user?.email){
            return null;
        }

        const currentUser = await prisma.user.findUnique({
            where : {
                email : session.user.email as string
            }
        });

        if(!currentUser){
            return null;
        }


        return currentUser;

    } catch (error) {
        return null;
    }
}
