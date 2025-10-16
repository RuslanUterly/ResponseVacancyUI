import { useEffect } from "react";
import {Paper, Title, Group, Button, Center, Space} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import {useProfileStore} from "../../profile/store.ts";
import {useGroupStore} from "../store.ts";
import {GroupCard} from "../components/GroupCard.tsx";
import {cancelColor, mainColor} from "../../../shared/components/theme/colors.ts";
import { Text } from '@mantine/core';

export const GroupsPage = () => {
    const { user } = useProfileStore();
    const { groups, fetchGroups } = useGroupStore();

    const navigate = useNavigate();

    useEffect(() => {
        const load = async () => {
            if (user?.id) {
                await fetchGroups(user.id);
            }
        };

        load();
    }, [user?.id]);
    
    return (
        <>
            <Space h="xl" />
            <Space h="xl" />
            
            <Group justify="space-between">
                <Title order={3} mb="md">Мои группы</Title>
                <Button color={mainColor} onClick={() => navigate("/groups/create")}>Добавить</Button>
            </Group>

            <Paper bg="#F8F8F8" withBorder p="md" radius="md">
                {groups.length <= 0 && (
                    <Center>
                        <Text c={cancelColor}>Необходимо добавить группу. Без групп автоотклики работать не будут!!!</Text>
                    </Center>
                )}
                
                <Group gap="sm">
                    {groups.map(group => (
                        <GroupCard
                            key={group.id}
                            group={group}
                            onClick={() => navigate(`/groups/${group.id}`)}
                        />
                    ))}
                </Group>
            </Paper>
        </>
    );
};
