"use client";

import useActiveForm from "@/hooks/use-active-form"
import LoginForm from "./components/login-form";
import RegisterForm from "./components/register-form";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

const page = () => {
    const session = useSession();
    const router = useRouter();
    const {activeForm} = useActiveForm();

    useEffect( () => {
        if(session.status === 'authenticated'){
            router.push('/')
            return;
        }
    } , [router, session.status])

    return (
        <div
            className="relative w-screen h-screen flex justify-center items-center bg-[#1a1d21]"
        >

            {activeForm === 'login' ? (

                <LoginForm/>

            ) : activeForm === 'register' ? (
                
                <RegisterForm/>
                
            ) : (
                <p>How Do it?</p>
            )}
        </div>
    )
}

export default page