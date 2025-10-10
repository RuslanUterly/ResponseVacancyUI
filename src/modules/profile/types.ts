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

export interface HeadHunterClientCredentialsDto {
    clientId: string;
    clientSecret: string;
}

export interface HeaderProps {
    email?: string;
}