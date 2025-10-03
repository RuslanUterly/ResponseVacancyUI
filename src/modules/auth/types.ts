export interface Credentials {
    email: string;
    password: string;
}

export interface LoginResponse {
    accessToken: string;
}

export interface RegisterResponse {
    message: string;
}