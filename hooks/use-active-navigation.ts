import { create } from "zustand";

interface Props {
    activeNav : string;
    setActiveNav : (val :string) => void;
}

const useNavigator = create<Props>( set => ({
    activeNav : "settings",
    setActiveNav : (val:string) => set({activeNav : val}),
}));

export default useNavigator