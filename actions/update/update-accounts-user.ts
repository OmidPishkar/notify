"use server"

import prisma from "@/libs/prismadb";

interface Props{
    facebookAccount : string | undefined;
    instagramAccount :  string | undefined;
    twitterAccount : string | undefined;
    userId : string;
}

export default async function updateUserAccounts({
    facebookAccount , instagramAccount ,twitterAccount , userId
} : Props) {

    try {
        
        const errorMessages : string[] = []
        const successMessages : string[] = [];

        // update instagram
        if(instagramAccount && instagramAccount.length >= 3){
        
            await prisma.user.update({
                where : {
                    id : userId
                } ,
                data : {
                    instagramAccount
                }
            }).then(result => {
                successMessages.push("instagram account is successfully updated!")
            })

        } else if(instagramAccount && instagramAccount.length < 3){
            errorMessages.push("instagram account must be at least 3 characters")
        }

        // update twitter
        if(twitterAccount && twitterAccount.length >= 3){
            await prisma.user.update({
                where : {
                    id : userId
                } ,
                data : {
                    twitterAccount
                }
            }).then(result => {
                successMessages.push("twitter account is successfully updated!")
            })
        } else if(twitterAccount && twitterAccount.length < 3){
            errorMessages.push("your twitter must be at least 3 numbers!")
        }


        // update facebook
        if(facebookAccount && facebookAccount.length >= 3){
            await prisma.user.update({
                where : {
                    id : userId
                } ,
                data : {
                    facebookAccount
                }
            }).then(result => {
                successMessages.push("facebook account is successfully updated!")
            })
        } else if(facebookAccount && facebookAccount.length < 3){
            errorMessages.push("your facebook id must be at least 3 characters!")
        }

        
        return {success : successMessages , error : errorMessages}

    } catch (error) {
        return null;
    }


}