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

export const addHeadHunterCredentials = async (dto: HeadHunterClientCredentialsDto): Promise<void> => {
    const response = await fetch(`${BASE_URL}/add-hh-credentials`, {
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
