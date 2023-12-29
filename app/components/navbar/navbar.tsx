"use client";

import useNavigator from "@/hooks/use-active-navigation";
import SettingsNav from "./components/settings-navbar/setting-navbar";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Friends from "./components/friends-navbar/friends";
import Notifications from "./components/notifications/notifications";


const Navbar = () => {
    const { activeNav } = useNavigator();
    const pathname = usePathname();

    return (
        <nav
            className={clsx(
                `fixed z-10  top-0 shadow-xl left-0 lg:left-[100px] w-screen lg:w-[370px] h-screen bg-[#1a1d21] px-5 sm:px-10 lg:px-5 py-7
                overflow-x-hidden overflow-y-scroll scrollbar-none`,
                pathname === '/authentication' ? "hidden" : "block"
            )}
        >
            {activeNav === "settings" && (
                <SettingsNav />
            )}
            {activeNav === "create-chat" && (
                <p>create chat</p>
            )}
            {activeNav === "friends" && (
                <Friends/>
            )}
            {activeNav === "notifications" && (
                <Notifications/>
            )}
            {activeNav === "chats" && (
                <p>conversations</p>
            )}


        </nav>
    )
};


export default Navbar;