import type {HeadHunterClientCredentialsDto, UserInfo} from './types';
import {baseUrl} from "../../shared/api/options.ts";
import {authHeader} from "../../shared/api/authHeader.ts";

const BASE_URL = baseUrl + '/profile';

export const getProfile = async (): Promise<UserInfo> => {
    const response = await fetch(`${BASE_URL}/me`, { 
        headers: authHeader() 
    });
    
    if (!response.ok) {
        throw new Error("Failed to fetch full user info");
    }
    
    return await response.json();
};

export const updateHeadHunterCredentials = async (dto: HeadHunterClientCredentialsDto): Promise<void> => {
    const response = await fetch(`${BASE_URL}/update-hh-credentials`, {
        method: "POST",
        headers: {
            ...authHeader(),
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dto),
    });

    if (!response.ok) {
        throw new Error("Failed to add HeadHunter credentials");
    }
};

export const exchangeHhCode = async (code: string): Promise<boolean> => {
    const res = await fetch(`${BASE_URL}/exchange-hh-code`, {
        method: "POST",
        headers: {
            ...authHeader(),
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(code),
    });
    if (!res.ok) throw new Error("Ошибка обмена кода на токен");
    return res.json();
};

export const refreshHhTokens = async (): Promise<boolean> => {
    const res = await fetch(`${BASE_URL}/refresh-hh-tokens`, {
        method: "POST",
        headers: {
            ...authHeader(),
            "Content-Type": "application/json",
        },
    });
    if (!res.ok) throw new Error("Ошибка обновления токена");
    return res.json();
};

