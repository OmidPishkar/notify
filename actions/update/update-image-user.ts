"use server"

import prisma from "@/libs/prismadb";

interface Props {
    imageUrl: string;
    userId: string;
}

export default async function updateImage({
    userId, imageUrl
}: Props) {

    try {

        await prisma.user.update({
            where: {
                id : userId
            },
            data: {
                profileImage : imageUrl
            }
        })

        return "Profile Image successfully updated!"

    } catch (error) {
        return null;
    }


}