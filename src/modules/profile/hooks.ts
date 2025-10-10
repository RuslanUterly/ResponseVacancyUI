import {useProfileStore} from "./store.ts";
import {useMutation} from "@tanstack/react-query";

export const useExchangeHhCode = () => {
    const exchangeHhCode = useProfileStore((s) => s.exchangeHhCode);

    return useMutation({
        mutationFn: (code: string) => exchangeHhCode(code),
        onError: (err: any) => {
            console.error("Ошибка обмена HH-кода:", err);
        },
    });
};

export const useRefreshHhTokens = () => {
    const refreshHhTokens = useProfileStore((s) => s.refreshHhTokens);

    return useMutation({
        mutationFn: () => refreshHhTokens(),
        onError: (err: any) => {
            console.error("Ошибка при обновлении HH токена:", err);
        },
    });
};

