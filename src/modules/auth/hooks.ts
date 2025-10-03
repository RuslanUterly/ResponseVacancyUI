import { useMutation } from '@tanstack/react-query';
import { login as apiLogin, register as apiRegister } from './api';
import { useAuthStore } from './store';
import type {Credentials, LoginResponse, RegisterResponse} from "./types.ts";

export const useLogin = () => {
    const setToken = useAuthStore((state) => state.setToken);

    return useMutation<LoginResponse, Error, Credentials>({
        mutationFn: (credentials) => apiLogin(credentials),
        onSuccess: (data) => {
            setToken(data.accessToken);
            localStorage.setItem('accessToken', data.accessToken);
        },
        onError: (err) => console.error(err),
    });
};

export const useRegister = () => {
    return useMutation<RegisterResponse, Error, Credentials>({
        mutationFn: (credentials) => apiRegister(credentials),
        onSuccess: (data) => {
            console.log('Registration successful:', data.message);
        },
        onError: (err) => console.error(err),
    });
};
