import { create } from "zustand";
import {createGroup, deleteGroup, getGroupById, getMyGroups, updateGroup} from "./api.ts";
import type {GroupDto} from "./types.ts";

interface GroupStore {
    groups: GroupDto[];
    currentGroup: GroupDto | null;
    loading: boolean;
    error: string | null;

    fetchGroups: (accountId: bigint) => Promise<void>;
    fetchGroupById: (groupId: bigint) => Promise<void>;
    createGroup: (dto: GroupDto) => Promise<void>;
    updateGroup: (groupId: bigint, dto: GroupDto) => Promise<void>;
    deleteGroup: (groupId: bigint) => Promise<void>;
}

export const useGroupStore = create<GroupStore>((set, get) => ({
    groups: [],
    currentGroup: null,
    loading: false,
    error: null,
    
    fetchGroups: async (accountId) => {
        set({ loading: true, error: null });
        
        try {
            const groups = await getMyGroups(accountId);
            set({ groups: groups });
        } catch (error: any) {
            set({ error: error.message });
        } finally {
            set({ loading: false });
        }
    },

    fetchGroupById: async (groupId) => {
        set({ loading: true, error: null });
        
        try {
            const group = await getGroupById(groupId);
            set({ currentGroup: group });
        } catch (error: any) {
            set({ error: error.message });
        } finally {
            set({ loading: false });
        }
    },

    createGroup: async (dto) => {
        set({ loading: true, error: null });
        
        try {
            const newGroupId = await createGroup(dto);
            const group = await getGroupById(newGroupId);
            set({ groups: [...get().groups, group] });
        } catch (error: any) {
            set({ error: error.message });
        } finally {
            set({ loading: false });
        }
    },

    updateGroup: async (groupId, dto) => {
        set({ loading: true, error: null });
        
        try {
            await updateGroup(groupId, dto);
            set({
                groups: get().groups.map((g) =>
                    g.id === groupId ? { ...g, ...dto } : g
                ),
            });
        } catch (error: any) {
            set({ error: error.message });
        } finally {
            set({ loading: false });
        }
    },

    deleteGroup: async (groupId) => {
        set({ loading: true, error: null });
        
        try {
            await deleteGroup(groupId);
            set({
                groups: get().groups.filter((g) => g.id !== groupId),
            });
        } catch (error: any) {
            set({ error: error.message });
        } finally {
            set({ loading: false });
        }
    },
}));
