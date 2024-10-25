import { create } from "zustand";

type DrawerState = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

const useDrawerStore = create<DrawerState>((set) => ({
    isOpen: false,
    onOpen: () => set((state) => ({ isOpen: true })),
    onClose: () => set((state) => ({ isOpen: false })),
}));

export default useDrawerStore;
