"use server"

import prisma from "@/libs/prismadb";
import bcrypt from "bcrypt"

interface Props {
    newPassword: string | undefined;
    userId: string;
}

export default async function updatePassword({
    userId, newPassword
}: Props) {

    try {

        if (newPassword) {
            const hashedPassword = await bcrypt.hash(newPassword, 8)

            await prisma.user.update({
                where: {
                    id: userId
                },
                data: {
                    password : hashedPassword
                }
            })

            return "Password successfully updated!"
        }

    } catch (error) {
        return null;
    }


}