import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import {useExchangeHhCode} from "../../hooks.ts";
import {Container, Loader, Paper} from "@mantine/core";
import {mainColor} from "../../../../shared/components/theme/colors.ts";

export const HhCallbackPage = () => {
    const [params] = useSearchParams();
    const code = params.get("code");
    const navigate = useNavigate();

    const { mutateAsync: exchangeHhCode, isPending } = useExchangeHhCode();

    useEffect(() => {
        if (!code) {
            notifications.show({
                title: "Ошибка",
                message: "Отсутствует код авторизации HH",
                color: "red",
            });
            navigate("/profile");
            return;
        }

        const processAuth = async () => {
            try {
                await exchangeHhCode(code);
                notifications.show({
                    title: "Успех",
                    message: "Авторизация через HH прошла успешно",
                    color: "green",
                });
                await new Promise((resolve) => setTimeout(resolve, 500));
                navigate("/profile");
            } catch (err: any) {
                console.error(err);
                notifications.show({
                    title: "Ошибка",
                    message: "Не удалось авторизоваться через HH",
                    color: "red",
                });
                await new Promise((resolve) => setTimeout(resolve, 500));
                navigate("/profile");
            }
        };

        processAuth();
    }, [code]);

    return (
        <Container size="sm">
            <Paper p="md" radius="md" withBorder align="center">
                <div>{isPending ? "Авторизация через HH..." : "Завершение входа..."}</div>
                <Loader color={mainColor} ></Loader>
            </Paper>
        </Container>);
};
