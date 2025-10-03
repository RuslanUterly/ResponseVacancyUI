import { create } from 'zustand';

interface AuthState {
    accessToken: string | null;
    setToken: (token: string | null) => void;
    isAuthenticated: boolean;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    accessToken: localStorage.getItem('accessToken'),
    isAuthenticated: !!localStorage.getItem('accessToken'),
    
    setToken: (token) => set({ accessToken: token, isAuthenticated: true }),
    logout: () => {
        set({ accessToken: null, isAuthenticated: false });
        localStorage.removeItem('accessToken');
    },
}));
