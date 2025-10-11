import { useState, useEffect } from "react";
import { Button, Group, Stack, Text, TextInput, Title } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useProfileStore } from "../store";
import {cancelColor, mainColor, successColor} from "../../../shared/components/theme/colors";
import {HhConnectionButton} from "./HhConnectionButton.tsx";

export const HhCredentialsForm = () => {
    const { user, error, updateClientCredentials } = useProfileStore();
    const [clientId, setClientId] = useState("");
    const [clientSecret, setClientSecret] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (user) {
            setClientId(user.clientId ?? "");
            setClientSecret(user.clientSecret ?? "");
        }
    }, [user]);

    const handleSave = async () => {
        await updateClientCredentials({ clientId, clientSecret });

        if (!error) {
            notifications.show({
                title: "Успешно",
                message: "Данные были обновлены!",
                color: "green",
                icon: <IconCheck size={18} />,
            });
            setIsEditing(false);
        } else {
            notifications.show({
                title: "Ошибка",
                message: "Не удалось обновить данные.",
                color: "red",
                icon: <IconX size={18} />,
            });
        }
    };

    return (
        <Stack>
            <Title order={4}>Настройки HH</Title>

            {!isEditing ? (
                <Stack>
                    <div>
                        <Text size="sm" fw={500}>Client_ID</Text>
                        <Text style={{ wordBreak: "break-word" }}>{user?.clientId ?? "—"}</Text>
                    </div>
                    <div>
                        <Text size="sm" fw={500}>Client_Secret</Text>
                        <Text style={{ wordBreak: "break-word" }}>{user?.clientSecret ?? "—"}</Text>
                    </div>
                </Stack>
            ) : (
                <Stack>
                    <TextInput label="Client_ID" value={clientId} onChange={(e) => setClientId(e.currentTarget.value)} />
                    <TextInput label="Client_Secret" value={clientSecret} onChange={(e) => setClientSecret(e.currentTarget.value)} />
                </Stack>
            )}

            {isEditing ? (
                <Group justify="space-between">
                    <Button color={cancelColor} variant="light" onClick={() => setIsEditing(false)}>Отмена</Button>
                    <Button color={successColor} onClick={handleSave}>Сохранить</Button>
                </Group>
            ) : (
                <Group justify="space-between">
                    <Button color={mainColor} onClick={() => setIsEditing(true)}>Изменить</Button>
                    <HhConnectionButton />
                </Group>
            )}
        </Stack>
    );
};
