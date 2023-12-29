"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter , usePathname } from "next/navigation";
import NotSelected from "./components/not-select-conversation";

const page = () => {

    const session = useSession();
    const router = useRouter();
    const pathname = usePathname();

    useEffect( () => {

        if(session.status === 'unauthenticated'){
            router.push('/authentication');
            return;
        }

    } , [session.status , pathname]);

    return (
        <div
            className="bg-[#16191c] h-screen w-full lg:pl-[470px]"
        >
            <div className="p-4 h-full">
                <NotSelected/>
            </div>
        </div>
    )
}

export default page