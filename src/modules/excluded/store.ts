import type {ExcludedWordDto} from "./types.ts";
import {create} from "zustand";
import {
    createExcludedWord,
    deleteExcludedWord,
    getExcludedWordById,
    getExcludedWordsByGroup,
    updateExcludedWord
} from "./api.ts";

interface ExcludedWordStore {
    excludedWords: ExcludedWordDto[];
    currentExcludedWord: ExcludedWordDto | null;
    loading: boolean;
    error: string | null;

    fetchExcludedWords: (groupId: bigint) => Promise<void>;
    fetchExcludedWordById: (wordId: bigint) => Promise<void>;
    createExcludedWord: (groupId: bigint, dto: ExcludedWordDto) => Promise<void>;
    updateExcludedWord: (wordId: bigint, dto: ExcludedWordDto) => Promise<void>;
    deleteExcludedWord: (wordId: bigint) => Promise<void>;
}

export const useExcludedWordStore = create<ExcludedWordStore>((set, get) => ({
    excludedWords: [],
    currentExcludedWord: null,
    loading: false,
    error: null,

    fetchExcludedWords: async (groupId: bigint) => {
        set({ loading: true, error: null });

        try {
            const excludedWords = await getExcludedWordsByGroup(groupId);
            set({ excludedWords: excludedWords });
        } catch (error: any) {
            set({ error: error.message });
        } finally {
            set({ loading: false });
        }
    },
    
    fetchExcludedWordById: async (wordId: bigint) => {
        set({ loading: true, error: null });

        try {
            const excludedWord = await getExcludedWordById(wordId);
            set({ currentExcludedWord: excludedWord });
        } catch (error: any) {
            set({ error: error.message });
        } finally {
            set({ loading: false });
        }
    },
    
    createExcludedWord: async (groupId: bigint, dto: ExcludedWordDto) => {
        set({ loading: true, error: null });

        try {
            const newExcludedWordId = await createExcludedWord(groupId, dto);
            const excludedWord = await getExcludedWordById(newExcludedWordId);
            set({ excludedWords: [...get().excludedWords, excludedWord] });
        } catch (error: any) {
            set({ error: error.message });
        } finally {
            set({ loading: false });
        }
    },
    
    updateExcludedWord: async (wordId: bigint, dto: ExcludedWordDto) => {
        set({ loading: true, error: null });

        try {
            await updateExcludedWord(wordId, dto);
            set({
                excludedWords: get().excludedWords.map((w) =>
                    w.id === wordId ? { ...w, ...dto } : w
                ),
            });
        } catch (error: any) {
            set({ error: error.message });
        } finally {
            set({ loading: false });
        }
    },
    
    deleteExcludedWord: async (wordId: bigint) => {
        set({ loading: true, error: null });

        try {
            await deleteExcludedWord(wordId);
            set({
                excludedWords: get().excludedWords.filter((w) => w.id !== wordId),
            });
        } catch (error: any) {
            set({ error: error.message });
        } finally {
            set({ loading: false });
        }
    },
}));
