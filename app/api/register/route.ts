import bcrypt from 'bcrypt';

// import prisma from '@/libs/prismadb';
// import prisma from '@prisma/client';
import prisma from '@/libs/prismadb';
import { NextResponse } from 'next/server';

// const prisma = new PrismaClient();

export async function POST(
    req : Request
){

    try {
        const body = await req.json();


        const {
            email , username , password
        } = body;

        if( !email || !username || !password ){
            return new NextResponse("Missing Info" , { status : 400})
        }

        const hashedPassword = await bcrypt.hash(password , 8);

        const user = await prisma.user.create({
            data : {
                username ,
                email ,
                password : hashedPassword
            }
        })
    
        return NextResponse.json(user)  
    } catch (error) {
        console.log("REGISTER ROUTE ERROR" , error)
        return new NextResponse("Internal Error" , {status : 500})
    }

}