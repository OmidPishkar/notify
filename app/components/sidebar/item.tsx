"use client";

import { LucideIcon } from "lucide-react";
import useNavigator from "@/hooks/use-active-navigation";
import clsx from "clsx";

interface Props {
    title: string;
    Icon : LucideIcon
}

const SidebarItem : React.FC<Props> = ({Icon , title}) => {
    const {activeNav , setActiveNav} = useNavigator()
    
    return (
        <li
            onClick={() => setActiveNav(title)}
            className={clsx(
                "list-none p-3 text-[#a7a6a8] cursor-pointer hover:text-indigo-500 hover:shadow-2xl transition-all",
                activeNav === title ? "text-indigo-500 hover:text-indigo-400" : ""
            )}
        >
            <Icon size={24}/>
        </li>
    )
};

export default SidebarItem;