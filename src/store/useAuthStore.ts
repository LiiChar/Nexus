import type { user } from '@/types/user';
import { create } from 'zustand';

interface AuthState {
	user: user | null;
	setUser: (user: user) => void;
	removeUser: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
	user: null,
	setUser: (user: user) => set((state) => ({ user: user })),
	removeUser: () => set((state) => ({ user: null })),
}));
