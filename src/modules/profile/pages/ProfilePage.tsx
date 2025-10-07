import { useEffect } from "react";
import { useProfileStore } from "../../../modules/profile/store";
import {
    Button,
    TextInput,
    Stack,
    Container,
    Group,
    Paper,
    SimpleGrid,
    Text,
    Title,
    Space,
} from "@mantine/core";
import {notifications} from "@mantine/notifications";

import { useState } from "react";
import {IconCheck, IconX} from "@tabler/icons-react";
import {hhColor, mainColor, successColor} from "../../../shared/components/theme/colors.ts";

export const ProfilePage = () => {
    const { user, error, fetchProfile, addClientCredentials } = useProfileStore();
    
    const [clientId, setClientId] = useState("");
    const [clientSecret, setClientSecret] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);

    useEffect(() => {
        if (user) {
            setClientId(user.clientId ?? "");
            setClientSecret(user.clientSecret ?? "");
        }
    }, [user]);

    const handleSave = async () => {
        await addClientCredentials({ clientId, clientSecret });

        if (!error) {
            notifications.show({
                title: "Успешно",
                message: "Данные были успешно обновлены!",
                color: "green",
                icon: <IconCheck size={18} />,
            });
            setIsEditing(false);
        } else {
            notifications.show({
                title: "Ошибка",
                message: "Не удалось обновить данные. Попробуйте снова.",
                color: "red",
                icon: <IconX size={18} />,
            });
        }
    };


    return (
        <Container size="md" style={{ width: "100%" }}>
            <Group mt={50} >
                <Title order={2}>{user?.email}</Title>
            </Group>
            
            <Space h="lg"/>
            
            <SimpleGrid cols={2}>
                <Paper p="md" radius="md" withBorder>
                    <Stack>
                        <Title order={4}>Настройки HH</Title>

                        {!isEditing && (
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
                        )}

                        {isEditing && (
                            <Group>
                                <TextInput
                                    label="Client_ID"
                                    value={clientId}
                                    onChange={(e) => setClientId(e.currentTarget.value)}
                                    style={{ width: "100%" }}
                                />
                                <TextInput
                                    label="Client_Secret"
                                    value={clientSecret}
                                    onChange={(e) => setClientSecret(e.currentTarget.value)}
                                    style={{ width: "100%" }}
                                />
                            </Group>
                        )}
                        
                        {isEditing ? (
                            <Group justify="space-between">
                                <Button color={successColor} onClick={handleSave}>
                                    Сохранить
                                </Button>
                                <Button 
                                    variant="default"
                                    onClick={() => setIsEditing(false)}>Отмена</Button>
                            </Group>
                            ) : (
                            <Group justify="space-between">
                                <Button 
                                    color={mainColor}
                                    onClick={() => setIsEditing(true)}>Изменить</Button>
                                <Button 
                                    color={hhColor}
                                    onClick={() => {}}>Войти через HH</Button>
                            </Group>
                        )}
                    </Stack>
                </Paper>
            </SimpleGrid>
        </Container>
    );
};
