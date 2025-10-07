import { create } from "zustand";
import {addHeadHunterCredentials, getProfile} from "./api";
import type {HeadHunterClientCredentialsDto, UserInfo} from "./types.ts";
import {useAuthStore} from "../auth/store.ts";

interface ProfileState {
    user: UserInfo | null;
    isLoading: boolean;
    error: string | null;
    fetchProfile: () => Promise<void>;
    addClientCredentials: (dto: HeadHunterClientCredentialsDto) => Promise<void>;
    clear: () => void;
    init: () => Promise<void>;
}

export const useProfileStore = create<ProfileState>((set, get) => ({
    user: null,
    isLoading: false,
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
    
    addClientCredentials: async (dto) => {
        try {
            set({ isLoading: true });
            await addHeadHunterCredentials(dto); 
            
            const data = await getProfile();
            set({ user: data, isLoading: false });
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
        }
    },

    clear: () => set({ user: null }),

    init: async () => {
        const token = useAuthStore.getState().accessToken;
        if (token) {
            await get().fetchProfile();
        }
    },
}));


