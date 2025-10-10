import { Group, Title } from "@mantine/core";
import type { FC } from "react";
import type {HeaderProps} from "../types.ts";

export const ProfileHeader: FC<HeaderProps> = ({ email }) => (
    <Group mt={50}>
        <Title order={2}>{email ?? "Профиль"}</Title>
    </Group>
);
