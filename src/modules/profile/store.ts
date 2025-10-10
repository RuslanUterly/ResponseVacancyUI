import { create } from "zustand";
import {updateHeadHunterCredentials, getProfile, exchangeHhCode, refreshHhTokens} from "./api";
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
      try {
          set({ isLoading: true });
          const data = await getProfile();
          set({ user: data, isLoading: false });
      }   catch (error: any) {
          set({ error: error.message, isLoading: false });
      }
    },
    
    updateClientCredentials: async (dto) => {
        try {
            set({ isLoading: true });
            await updateHeadHunterCredentials(dto); 
            
            const data = await getProfile();
            set({ user: data, isLoading: false });
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
        }
    },

    exchangeHhCode: async (code) => {
        try {
            set({ isLoading: true });
            const response = await exchangeHhCode(code);
            const user = await getProfile();
            set({ user, isLoading: false, isHhLinked: response, isHhTokenActive: response });
            console.log("HH exchange:", response);
        } catch (error: any) {
            set({ error: error.message, isLoading: false, isHhLinked: false });
        }
    },

    refreshHhTokens: async () => {
        try {
            set({ isLoading: true });
            const response = await refreshHhTokens();
            console.log("Токен успешно обновлён:", response);
            const user = await getProfile();
            set({ user, isLoading: false, isHhTokenActive: response });
        } catch (error: any) {
            console.error("Ошибка обновления HH токена:", error);
            set({ error: error.message, isLoading: false, isHhLinked: false, isHhTokenActive: false });
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


