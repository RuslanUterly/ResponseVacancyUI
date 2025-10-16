import { baseUrl } from "../../shared/api/options.ts";
import { authHeader } from "../../shared/api/authHeader.ts";
import type { GroupDto } from "./types.ts"; 

const BASE_URL = `${baseUrl}/group`;

export const getMyGroups = async (accountId: bigint): Promise<GroupDto[]> => {
    const response = await fetch(`${BASE_URL}/?accountId=${accountId}`, {
        headers: authHeader(),
    });

    if (!response.ok)
        throw new Error("Не удалось получить список групп");

    return await response.json();
}

export const getGroupById = async (groupId: bigint): Promise<GroupDto> => {
    const response = await fetch(`${BASE_URL}/${groupId}`, {
        headers: authHeader(),
    });

    if (!response.ok)
        throw new Error("Не удалось получить данные группы");

    return await response.json();
}

export const createGroup = async (dto: GroupDto): Promise<bigint> => {
    const response = await fetch(`${BASE_URL}/create`, {
        method: "POST",
        headers: {
            ...authHeader(),
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dto),
    });

    if (!response.ok)
        throw new Error("Не удалось создать группу");

    return await response.json();
}

export const updateGroup = async (groupId: bigint, dto: GroupDto): Promise<void> => {
    const response = await fetch(`${BASE_URL}/update/${groupId}`, {
        method: "PUT",
        headers: {
            ...authHeader(),
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dto),
    });

    if (!response.ok)
        throw new Error("Не удалось обновить группу");
}

export const deleteGroup = async (groupId: bigint): Promise<void> => {
    const response = await fetch(`${BASE_URL}/delete/${groupId}`, {
        method: "DELETE",
        headers: authHeader(),
    });

    if (!response.ok)
        throw new Error("Не удалось удалить группу");
}
