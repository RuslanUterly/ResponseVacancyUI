import { create } from "zustand";
import {
    updateHeadHunterCredentials, getProfile, exchangeHhCode, refreshHhTokens,
    updateHhResponseMode
} from "./api";
import type {HeadHunterClientCredentialsDto, UserInfo} from "./types.ts";
import {useAuthStore} from "../auth/store.ts";

interface ProfileState {
    user: UserInfo | null;
    isLoading: boolean;
    isHhLinked: boolean;
    isHhTokenActive: boolean;
    error: string | null;
    
    fetchProfile: () => Promise<void>;
    updateClientCredentials: (dto: HeadHunterClientCredentialsDto) => Promise<void>;
    exchangeHhCode: (code: string) => Promise<void>;
    refreshHhTokens: () => Promise<void>;
    updateHhResponseMode: (mode: boolean) => Promise<void>;
    clear: () => void;
    init: () => Promise<void>;
}

export const useProfileStore = create<ProfileState>((set, get) => ({
    user: null,
    isLoading: false,
    isHhLinked: false,
    isHhTokenActive: false,
    error: null,
    
    fetchProfile: async () => {
        set({ isLoading: true, error: null });

        try {
            const user = await getProfile();
            set({ user: user });
        } catch (error: any) {
            set({ error: error.message });
        } finally {
            set({ isLoading: false });
        }
    },
    
    updateClientCredentials: async (dto) => {
        set({ isLoading: true, error: null });

        try {
            await updateHeadHunterCredentials(dto);
            const user = await getProfile();
            set({ user: user });
        } catch (error: any) {
            set({ error: error.message });
        } finally {
            set({ isLoading: false });
        }
    },

    exchangeHhCode: async (code) => {
        set({ isLoading: true, error: null });
        
        try {
            const response = await exchangeHhCode(code);
            const user = await getProfile();
            set({ user: user, isHhLinked: response, isHhTokenActive: response });
            console.log("HH exchange:", response);
        } catch (error: any) {
            set({ error: error.message, isHhLinked: false });
        } finally {
            set({ isLoading: false });
        }
    },

    refreshHhTokens: async () => {
        set({ isLoading: true, error: null });

        try {
            const response = await refreshHhTokens();
            console.log("Токен успешно обновлён:", response);
            const user = await getProfile();
            set({ user: user, isHhTokenActive: response });
        } catch (error: any) {
            console.error("Ошибка обновления HH токена:", error);
            set({ error: error.message, isHhLinked: false, isHhTokenActive: false });
        } finally {
            set({ isLoading: false });
        }
    },

    updateHhResponseMode: async (mode: boolean) => {
        set({ isLoading: true, error: null });
        
        try {
            await updateHhResponseMode(mode);
            const user = await getProfile();
            set({ user: user });
        } catch (error: any) {
            console.error("Ошибка при обновлении режима автооткликов:", error);
            set({ error: error.message });
        } finally {
            set({ isLoading: false });
        }
    },
    
    clear: () => set({ user: null }),

    init: async () => {
        const token = useAuthStore.getState().accessToken;
        if (token) {
            await get().fetchProfile();

            try {
                const response = await refreshHhTokens();
                set({ isHhTokenActive: response, isHhLinked: response });
            } catch {
                set({ isHhTokenActive: false, isHhLinked: false });
            } 
        }
    },
}));


