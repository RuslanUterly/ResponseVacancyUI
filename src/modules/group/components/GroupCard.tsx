import { Paper, Text, Stack } from "@mantine/core";
import type {GroupCardProps} from "../types.ts";

export const GroupCard = ({ group, onClick }: GroupCardProps) => {
    const settings = group.settings;

    return (
        <Paper
            withBorder
            p="sm"
            radius="md"
            onClick={onClick}
            style={{ cursor: "pointer" }}
        >
            <Stack gap={4}>
                <Text fw={600}>{settings?.text || "Без названия"}</Text>
                <Text size="sm" c="dimmed">Опыт: {settings?.experience ?? "Не указан"}</Text>
                <Text size="sm" c="dimmed">График: {settings?.schedule ?? "Не указан"}</Text>
                <Text size="sm" c="dimmed">Область: {settings?.area ?? "-"}</Text>
            </Stack>
        </Paper>
    );
};
