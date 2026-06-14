import { create } from "zustand";

interface AppStore {
	isLoading: boolean;
	setIsLoading: (isLoading: boolean) => void;
}

export const useAppStore = create<AppStore>((set) => ({
	isLoading: false,
	setIsLoading: (isLoading) => set({ isLoading }),
}));
