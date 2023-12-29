import { create } from 'zustand';

interface Props {
    activeForm : string;
    setActiveForm : (val : string) => void;
}

const useActiveForm = create<Props>(set => ({
    activeForm : "login",
    setActiveForm : (val : string) => set({activeForm: val})
}));

export default useActiveForm;