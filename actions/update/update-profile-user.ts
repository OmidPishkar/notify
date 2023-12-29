"use server"

import prisma from "@/libs/prismadb";

interface Props{
    username : string | undefined;
    phoneNumber : string | undefined;
    bio: string | undefined;
    userId : string;
}

export default async function updateProfileUser({
    bio  , phoneNumber , userId , username
} : Props) {

    try {
        
        const errorMessages : string[] = []
        const successMessages : string[] = [];

        // update usernama
        if(username && username.length >= 3){
        
            await prisma.user.update({
                where : {
                    id : userId
                } ,
                data : {
                    username
                }
            }).then(result => {
                successMessages.push("username is successfully updated!")
            })

        } else if(username && username.length < 3){
            errorMessages.push("Username must be at least 3 characters")
        }

        // update phone number
        if(phoneNumber && phoneNumber.length >= 11){
            await prisma.user.update({
                where : {
                    id : userId
                } ,
                data : {
                    phoneNumber
                }
            }).then(result => {
                successMessages.push("phone number is successfully updated!")
            })
        } else if(phoneNumber && phoneNumber.length < 11){
            errorMessages.push("phone number must be at least 11 numbers!")
        }


        // update biography
        if(bio && bio.length >= 1){
            await prisma.user.update({
                where : {
                    id : userId
                } ,
                data : {
                    bio
                }
            }).then(result => {
                successMessages.push("bio is successfully updated!")
            })
        } else if(phoneNumber && phoneNumber.length < 1){
            errorMessages.push("your bio must be at least 1 characters!")
        }

        
        return {success : successMessages , error : errorMessages}

    } catch (error) {
        return null;
    }


}