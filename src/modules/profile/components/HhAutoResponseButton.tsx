import { Button } from "@mantine/core";
import { useProfileStore } from "../store";
import { mainColor } from "../../../shared/components/theme/colors";

export const HhAutoResponseButton = () => {
    const { user, updateHhResponseMode, isHhLinked, isHhTokenActive } = useProfileStore();

    if (!isHhLinked || !isHhTokenActive) return null;

    const handleToggle = async () => {
        if (user) {
            await updateHhResponseMode(!user.isActiveResponse);
        }
    };

    return (
        <Button
            color={mainColor}
            onClick={handleToggle}
        >
            {user?.isActiveResponse
                ? "Отключить автоотклики"
                : "Включить автоотклики"}
        </Button>
    );
};
