import type { ResumeDto, UserInfo} from './types';
import {baseUrl} from "../../shared/api/options.ts";
import {authHeader} from "../../shared/api/authHeader.ts";

const BASE_URL = baseUrl + '/profile';

export const getProfile = async (): Promise<UserInfo> => {
    const response = await fetch(`${BASE_URL}/me`, { 
        headers: authHeader() 
    });
    
    if (!response.ok) throw new Error("Ошибка получения юзера");
    return await response.json();
};

export const hhLogin = async (): Promise<string> => {
    const response = await fetch(`${BASE_URL}/login`, {
        headers: authHeader()
    });
    
    if (!response.ok) throw new Error("Ошибка получения redirectUrl")
    return await response.text();
}

export const getResume = async (): Promise<ResumeDto[]> => {
    const response = await fetch(`${BASE_URL}/resumes`, {
        headers: authHeader()
    });

    if (!response.ok) throw new Error("Failed to fetch full user info");
    return await response.json();
}

export const exchangeHhCode = async (code: string): Promise<boolean> => {
    const response = await fetch(`${BASE_URL}/exchange-hh-code`, {
        method: "POST",
        headers: {
            ...authHeader(),
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(code),
    });
    if (!response.ok) throw new Error("Ошибка обмена кода на токен");
    return await response.json();
};

export const refreshHhTokens = async (): Promise<boolean> => {
    const response = await fetch(`${BASE_URL}/refresh-hh-tokens`, {
        method: "POST",
        headers: {
            ...authHeader(),
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) throw new Error("Ошибка обновления токена");
    return await response.json();
};

export const updateHhResponseMode = async (isActive: boolean): Promise<void> => {
    const response = await fetch(`${BASE_URL}/update-hh-response-mode`, {
        method: "POST",
        headers: {
            ...authHeader(),
            "Content-Type": "application/json",
        },
        body: JSON.stringify(isActive),
    });
    if (!response.ok) throw new Error("Ошибка обновления режима");
    return;
}

