export interface UserInfoSummary {
    id: bigint;
    email: string;
    userName?: string;
    isActiveResponse: boolean | null;
}

export interface UserInfo extends UserInfoSummary {
    clientId?: string | null;
    clientSecret?: string | null;
}

export interface HeaderProps {
    email?: string;
}

export interface ResumeDto {
    id: string;
    title: string;
}