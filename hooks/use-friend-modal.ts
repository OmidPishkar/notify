import { create } from 'zustand';

interface Props {
    isOpen : boolean;
    onOpen : () => void;
    onClose : () => void;
}

const useFriendsModal = create<Props>(set => ({
    isOpen : false,
    onOpen : () => set({isOpen: true}),
    onClose : () => set({isOpen: false}),
}));

export default useFriendsModal;