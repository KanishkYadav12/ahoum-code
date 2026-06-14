import { create } from "zustand";
import { ToastMessage } from "@/types";

interface ToastStore {
	toasts: ToastMessage[];
	
	showToast: (message: string, type: ToastMessage["type"], duration?: number) => void;
	removeToast: (id: string) => void;
	clearAll: () => void;
	
	success: (message: string, duration?: number) => void;
	error: (message: string, duration?: number) => void;
	info: (message: string, duration?: number) => void;
	warning: (message: string, duration?: number) => void;
}

export const useToastStore = create<ToastStore>((set, get) => ({
	toasts: [],
	
	showToast: (message, type, duration = 2500) => {
		const id = `${Date.now()}-${Math.random()}`;
		const toast: ToastMessage = { id, message, type, duration };
		
		set((state) => ({ toasts: [...state.toasts, toast] }));
		
		setTimeout(() => {
			get().removeToast(id);
		}, duration);
	},
	
	removeToast: (id: string) => {
		set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
	},
	
	clearAll: () => set({ toasts: [] }),
	
	success: (message, duration) => get().showToast(message, "success", duration),
	error: (message, duration) => get().showToast(message, "error", duration),
	info: (message, duration) => get().showToast(message, "info", duration),
	warning: (message, duration) => get().showToast(message, "warning", duration),
}));
