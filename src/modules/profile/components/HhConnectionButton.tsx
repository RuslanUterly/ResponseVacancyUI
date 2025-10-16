import { Button } from "@mantine/core";
import { useProfileStore } from "../store";
import { hhColor } from "../../../shared/components/theme/colors";
import {useEffect} from "react";

export const HhConnectionButton = () => {
    const { isHhLinked, isHhTokenActive, redirectUrl, hhLogin } = useProfileStore();

    useEffect(() => {
        if (!redirectUrl) {
            hhLogin();
        }
    }, [redirectUrl]);

    
    if (!isHhLinked && !isHhTokenActive) {
        return (
            <Button
                color={hhColor}
                onClick={() => {
                    if (redirectUrl != null) {
                        window.location.href = redirectUrl;
                    }
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
