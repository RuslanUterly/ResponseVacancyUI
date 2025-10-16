import { baseUrl } from "../../shared/api/options.ts";
import { authHeader } from "../../shared/api/authHeader.ts";
import type {ExcludedWordDto} from "./types.ts";


const BASE_URL = baseUrl + "/ExcludedWord";

export const getExcludedWordsByGroup = async (groupId: bigint): Promise<ExcludedWordDto[]> => {
    const res = await fetch(`${BASE_URL}?groupId=${groupId}`, {
        method: "GET",
        headers: {
            ...authHeader(),
        },
    });

    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Не удалось получить список исключённых слов");
    }

    return res.json();
};

export const getExcludedWordById = async (wordId: bigint): Promise<ExcludedWordDto> => {
    const res = await fetch(`${BASE_URL}/${wordId}`, {
        method: "GET",
        headers: {
            ...authHeader(),
        },
    });

    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Не удалось получить исключённое слово");
    }

    return res.json();
};

export const createExcludedWord = async (groupId: bigint, dto: ExcludedWordDto): Promise<bigint> => {
    const res = await fetch(`${BASE_URL}/create/${groupId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...authHeader(),
        },
        body: JSON.stringify(dto),
    });

    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Не удалось создать исключённое слово");
    }

    return res.json();
};

export const updateExcludedWord = async (wordId: bigint, dto: ExcludedWordDto): Promise<void> => {
    const res = await fetch(`${BASE_URL}/update/${wordId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            ...authHeader(),
        },
        body: JSON.stringify(dto),
    });

    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Не удалось обновить исключённое слово");
    }
};

export const deleteExcludedWord = async (wordId: bigint): Promise<void> => {
    const res = await fetch(`${BASE_URL}/delete/${wordId}`, {
        method: "DELETE",
        headers: {
            ...authHeader(),
        },
    });

    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Не удалось удалить исключённое слово");
    }
};
