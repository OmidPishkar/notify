"use client";

import Brand from "../brand";
import asideDetail from "@/configs/navigation-config";
import SidebarItem from "./item";
import { User } from "lucide-react";
import { usePathname } from "next/navigation";
import clsx from "clsx";


const Sidebar = () => {

    const pathname = usePathname();

    return (
        <aside
            className={clsx(
                `border-t border-[#1e2126] bg-[#16191c] fixed z-20 bottom-0 left-0 w-screen h-[70px] lg:w-[100px] lg:h-screen
                flex flex-row justify-between px-6 py-5 items-center
                lg:flex-col`,
                pathname === '/authentication' ? "hidden" : "block"
            )}
        >
            <Brand/>

            <ul className="flex lg:flex-col flex-row items-center flex-1 lg:flex-none  justify-between lg:gap-10">
                {asideDetail.map(aside => {
                    return (
                        <SidebarItem
                            title={aside.title}
                            key={aside.title}
                            Icon={aside.icon}
                        />
                    )
                })}
            </ul>

        </aside>
    )
};

export default Sidebar;