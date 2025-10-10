import { Button } from "@mantine/core";
import { useProfileStore } from "../store";
import { hhColor } from "../../../shared/components/theme/colors";

export const HhConnectionButton = () => {
    const { isHhLinked, isHhTokenActive, user } = useProfileStore();
    const clientId = user?.clientId;
    const clientSecret = user?.clientSecret;

    if (!clientId || !clientSecret) return null;

    if (!isHhLinked && !isHhTokenActive) {
        return (
            <Button
                color={hhColor}
                onClick={() => {
                    const redirectUri = `${window.location.origin}/auth/hh/callback`;
                    const authUrl = `https://hh.ru/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;
                    window.location.href = authUrl;
                }}
            >
                Войти через HH
            </Button>
        );
    }

    return (
        <Button color={hhColor} onClick={() => console.log("HH уже подключён")}>
            HH подключён
        </Button>
    );
};
